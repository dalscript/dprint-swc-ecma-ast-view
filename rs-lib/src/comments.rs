use crate::{tokens::*, SourceFile};
use swc_common::{
  comments::{Comment, SingleThreadedCommentsMapInner},
  BytePos,
};

pub struct CommentContainer<'a> {
  pub leading: &'a SingleThreadedCommentsMapInner,
  pub trailing: &'a SingleThreadedCommentsMapInner,
  tokens: &'a TokenContainer<'a>,
  source_file: &'a dyn SourceFile,
}

impl<'a> CommentContainer<'a> {
  pub fn new(
    leading: &'a SingleThreadedCommentsMapInner,
    trailing: &'a SingleThreadedCommentsMapInner,
    tokens: &'a TokenContainer<'a>,
    source_file: &'a dyn SourceFile,
  ) -> Self {
    CommentContainer {
      leading,
      trailing,
      tokens,
      source_file,
    }
  }

  pub fn all_comments(&'a self) -> CommentsIterator<'a> {
    let approx_cap = self.leading.len() + self.trailing.len();
    let mut v = Vec::with_capacity(approx_cap);
    v.extend(self.leading.values());
    v.extend(self.trailing.values());
    CommentsIterator::new(v)
  }

  pub fn leading_comments(&'a self, lo: BytePos) -> CommentsIterator<'a> {
    let previous_token_hi = self.tokens.get_token_index_at_lo(lo).map(|index| {
      if index == 0 {
        BytePos(0)
      } else {
        self.tokens.get_token_at_index(index - 1).unwrap().span.hi
      }
    });
    let leading = self.get_leading(lo);
    if let Some(previous_token_hi) = previous_token_hi {
      let trailing = self.get_trailing(previous_token_hi);
      combine_comment_vecs(trailing, leading)
    } else {
      leading
        .map(|l| CommentsIterator::new(vec![l]))
        .unwrap_or_default()
    }
  }

  pub fn trailing_comments(&'a self, hi: BytePos) -> CommentsIterator<'a> {
    let next_token_lo = self.tokens.get_token_index_at_hi(hi).map(|index| {
      self
        .tokens
        .get_token_at_index(index + 1)
        .map(|t| t.span.lo)
        .unwrap_or_else(|| self.source_file.span().hi())
    });
    let trailing = self.get_trailing(hi);
    if let Some(next_token_lo) = next_token_lo {
      let leading = self.get_leading(next_token_lo);
      combine_comment_vecs(trailing, leading)
    } else {
      trailing
        .map(|t| CommentsIterator::new(vec![t]))
        .unwrap_or_default()
    }
  }

  fn get_leading(&'a self, lo: BytePos) -> Option<&'a Vec<Comment>> {
    self.leading.get(&lo)
  }

  fn get_trailing(&'a self, hi: BytePos) -> Option<&'a Vec<Comment>> {
    self.trailing.get(&hi)
  }
}

fn combine_comment_vecs<'a>(
  a: Option<&'a Vec<Comment>>,
  b: Option<&'a Vec<Comment>>,
) -> CommentsIterator<'a> {
  let length = if a.is_some() { 1 } else { 0 } + if b.is_some() { 1 } else { 0 };
  let mut comment_vecs = Vec::with_capacity(length);
  if let Some(a) = a {
    comment_vecs.push(a);
  }
  if let Some(b) = b {
    comment_vecs.push(b);
  }
  CommentsIterator::new(comment_vecs)
}

#[derive(Clone)]
pub struct CommentsIterator<'a> {
  comment_vecs: Vec<&'a Vec<Comment>>,
  outer_index: usize,
  inner_index: usize,
  outer_index_back: usize,
  inner_index_back: usize,
}

impl<'a> CommentsIterator<'a> {
  pub fn empty() -> Self {
    Self::new(Vec::with_capacity(0))
  }

  pub fn new(comment_vecs: Vec<&'a Vec<Comment>>) -> Self {
    let outer_index_back = comment_vecs.len();
    CommentsIterator {
      comment_vecs,
      outer_index: 0,
      inner_index: 0,
      outer_index_back,
      inner_index_back: 0,
    }
  }

  pub fn reset(&mut self) {
    self.outer_index = 0;
    self.inner_index = 0;
  }

  pub fn extend(&mut self, iterator: CommentsIterator<'a>) {
    self.comment_vecs.extend(iterator.comment_vecs);

    // reset the back iterator
    self.outer_index_back = self.comment_vecs.len();
    self.inner_index_back = 0;
  }

  pub fn is_empty(&self) -> bool {
    for comments in self.comment_vecs.iter() {
      if !comments.is_empty() {
        return false;
      }
    }

    true
  }

  pub fn peek_last_comment(&self) -> Option<&'a Comment> {
    if let Some(comments) = self.comment_vecs.last() {
      comments.last()
    } else {
      None
    }
  }
}

impl<'a> Default for CommentsIterator<'a> {
  fn default() -> Self {
    Self::empty()
  }
}

impl<'a> Iterator for CommentsIterator<'a> {
  type Item = &'a Comment;

  fn next(&mut self) -> Option<&'a Comment> {
    loop {
      if let Some(comments) = self.comment_vecs.get(self.outer_index) {
        if let Some(comment) = comments.get(self.inner_index) {
          self.inner_index += 1;
          return Some(comment);
        } else {
          self.inner_index = 0;
          self.outer_index += 1;
        }
      } else {
        return None;
      }
    }
  }

  fn size_hint(&self) -> (usize, Option<usize>) {
    let mut next_inner_index = self.inner_index;
    let mut count = 0;
    for comment_vec in &self.comment_vecs[self.outer_index..] {
      count += comment_vec.len() - next_inner_index;
      next_inner_index = 0;
    }
    (count, Some(count))
  }
}

impl<'a> DoubleEndedIterator for CommentsIterator<'a> {
  fn next_back(&mut self) -> Option<&'a Comment> {
    if self.inner_index_back == 0 {
      if self.outer_index_back == 0 {
        return None;
      }
      self.outer_index_back -= 1;
      self.inner_index_back = self.comment_vecs.get(self.outer_index_back).unwrap().len() - 1;
    } else {
      self.inner_index_back -= 1;
    }

    self
      .comment_vecs
      .get(self.outer_index_back)
      .map(|inner| inner.get(self.inner_index_back))
      .flatten()
  }
}

#[cfg(test)]
mod test {
  use swc_common::BytePos;

  use crate::test_helpers::*;
  use crate::SpannedExt;

  #[test]
  fn trailing_comments_start_of_file_no_match() {
    run_test(r#"5 // test"#, |program| {
      // previously there was a bug here where it would return the
      // comments after the token
      let trailing_comments = BytePos(0).trailing_comments_fast(&program);
      assert!(trailing_comments.is_empty());
    });
  }
}
