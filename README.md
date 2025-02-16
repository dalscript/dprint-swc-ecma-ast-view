# dprint-swc-ecma-ast-view

[![](https://img.shields.io/crates/v/dprint-swc-ecma-ast-view.svg)](https://crates.io/crates/dprint-swc-ecma-ast-view) [![CI](https://github.com/dprint/dprint-swc-ecma-ast-view/workflows/CI/badge.svg)](https://github.com/dprint/dprint-swc-ecma-ast-view/actions?query=workflow%3ACI)

The library at `./rs-lib` is code generated from [swc_ecma_ast](https://crates.io/crates/swc_ecma_ast) via the code in `./generation` to produce a more easily navigable immutable AST.

## What does this do?

1. Creates a wrapper AST around [swc](https://github.com/swc-project/swc)'s AST that stores the node parents.
   - This is similar to a "red tree", but it creates it for every node. It's very fast to create these.
2. Adds a `Node` enum type to allow referencing any kind of node.
3. Adds many helper methods.

## Helpers

Spanned (All):

- `.lo(&self) -> BytePos`
- `.hi(&self) -> BytePos`
- `.text_fast(&self, root_node: &dyn RootNode) -> &'a str` -- Doesn't require going up the tree to the root node
- `.start_line_fast(&self, root_node: &dyn RootNode) -> usize`
- `.end_line_fast(&self, root_node: &dyn RootNode) -> usize`
- `.start_column_fast(&self, root_node: &dyn RootNode) -> usize`
- `.end_column_fast(&self, root_node: &dyn RootNode) -> usize`
- `.width_fast(&self, root_node: &dyn RootNode) -> usize`
- `.tokens_fast(&self, root_node: &dyn RootNode) -> &'a [TokenAndSpan]`
- `.leading_comments_fast(&self, root_node: &dyn RootNode) -> CommentsIterator<'a>`
- `.trailing_comments_fast(&self, root_node: &dyn RootNode) -> CommentsIterator<'a>`
- `.previous_token_fast(&self, root_node: &dyn RootNode) -> Option<&TokenAndSpan>`
- `.next_token_fast(&self, root_node: &dyn RootNode) -> Option<&TokenAndSpan>`
- `.previous_tokens_fast(&self, root_node: &dyn RootNode) -> &'a [TokenAndSpan]`
- `.next_tokens_fast(&self, root_node: &dyn RootNode) -> &'a [TokenAndSpan]`

Node/Enum Node/Nodes:

- `.module(&self) -> &'a Module` - Gets the root node if the view was created from a `Module`. Otherwise panics.
- `.script(&self) -> &'a Script` - Gets the root node if the view was created from a `Script`. Otherwise panics.
- `.program(&self) -> Program<'a>` - Gets the root node whether it be a `Module` or a `Script`.
- `.parent(&self) -> Option<Node<'a>>`
- `.children(&self) -> Vec<Node<'a>>`
- `.child_index(&self) -> usize`
- `.ancestors(&self) -> AncestorsIterator<'a>`
- `.previous_sibling(&self) -> Option<Node<'a>>`
- `.next_sibling(&self) -> Option<Node<'a>>`
- `.previous_siblings(&self) -> Vec<Node<'a>>`
- `.next_siblings(&self) -> Vec<Node<'a>>`
- `.text(&self) -> &str` - Slightly slower than `.text_fast(module)` because it requires going up the tree to get the root node
- `.start_line(&self) -> usize`
- `.end_line(&self) -> usize`
- `.start_column(&self) -> usize`
- `.end_column(&self) -> usize`
- `.width(&self) -> usize`
- `.tokens(&self) -> &[TokenAndSpan]` - All the descendant tokens within the span of the node.
- `.children_with_tokens(&self) -> Vec<NodeOrToken<'a>>` - Gets the children with the tokens found between the children
- `.children_with_tokens_fast(&self, root_node: &dyn RootNode) -> Vec<NodeOrToken<'a>>`
- `.leading_comments(&self) -> CommentsIterator<'a>`
- `.trailing_comments(&self) -> CommentsIterator<'a>`
- `.kind(&self) -> NodeKind` - Gets the "node kind" enum variant associated with the node (ex. `NodeKind::ClassDecl`).
- `.previous_token(&self) -> Option<&TokenAndSpan>`
- `.next_token(&self) -> Option<&TokenAndSpan>`
- `.previous_tokens(&self) -> &'a [TokenAndSpan]`
- `.next_tokens(&self) -> &'a [TokenAndSpan]`

Node/Enum Node:

- `.to::<NodeType>(&self) -> Option<&NodeType>`
- `.expect::<NodeType>(&self) -> &NodeType`
- `.is::<NodeType>(&self) -> bool`

TokenAndSpan extensions:

- `.token_index(&self, root_node: &dyn RootNode) -> usize` - Gets the token index of the specified module.

Root Node (Program/Module/Script):

- `token_at_index(&self, index: &usize) - Option<&TokenAndSpan>`

## View Construction Functions

- `with_ast_view` - Creates a view from an swc `Program` (either `Module` or `Script`)
- `with_ast_view_for_module` - Creates a view from an swc `Module`
- `with_ast_view_for_script` - Creates a view from an swc `Script`

## TODO

- Right now this only works if analyzing one file at a time. It would be good to improve the API to accept a large
  collection of source files (should be easy).
- Unit tests

## Example

Given the following parsed input code:

<!-- dprint-ignore -->
```ts
class MyClass { prop: string; myMethod() {}}
```

Code can be written like so:

```rust
// setup swc (parse an AST and optionally get the comments and tokens)
let source_file: swc_common::SourceFile = ...;
let program: swc_ecmascript::ast::Program = ...;
let comments: swc_common::comments::SingleThreadedComments = ...;
let tokens: Vec<swc_ecmascript::parser::token::TokenAndSpan> = ...;

// setup for creating a view
let program_info = ProgramInfo {
  program: &program,
  // optionally provide the swc_common::SourceFile or an implementation
  // of the `SourceFile` trait for using text related methods
  source_file: Some(&source_file),
  // optionally provide the comments for comment related methods
  comments: Some(&comments)
  // optionally provide the tokens for token related methods
  tokens: Some(&tokens),
};

// now create and use the view
dprint_swc_ecma_ast_view::with_ast_view(program_info, |program| {
  let class = program.children()[0].expect::<ClassDecl>().class;
  println!("{:?}", class.text());

  for child in class.children() {
    println!("---------");
    println!("Child: {:?}", child.text());
    println!("Parent: {:?}", child.parent().unwrap().text());
    if let Some(prev_sibling) = child.prev_sibling() {
      println!("Previous sibling: {:?}", prev_sibling.text());
    }
    if let Some(next_sibling) = child.next_sibling() {
      println!("Next sibling: {:?}", next_sibling.text());
    }
  }
});
```

Outputs:

```
"class MyClass { prop: string; myMethod() {}}"
---------
Child: "prop: string;"
Parent: "class MyClass { prop: string; myMethod() {}}"
Next sibling: "myMethod() {}"
---------
Child: "myMethod() {}"
Parent: "class MyClass { prop: string; myMethod() {}}"
Previous sibling: "prop: string;"
```
