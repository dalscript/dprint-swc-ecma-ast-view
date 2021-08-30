// This code is code generated.
// Run `./scripts/generate.sh` from the root directory to regenerate it.
import * as types from "./types.generated.ts";

export function setupModule(module: any): types.Module {
  visitNode(module, undefined);
  return module as types.Module;
}

function visitNode(node: any, parent: any) {
  Object.setPrototypeOf(node, getNodeClass(node).prototype);
  node.parent = parent;

  for (const key of Object.keys(node)) {
    const obj = node[key];
    if (obj != null && typeof obj === "object" && typeof obj.kind === "string") {
      visitNode(obj, node);
    }
  }
}

function getNodeClass(node: any) {
  switch (node.kind) {
    case types.NodeKind.ArrayLit:
      return types.ArrayLit;
    case types.NodeKind.ArrayPat:
      return types.ArrayPat;
    case types.NodeKind.ArrowExpr:
      return types.ArrowExpr;
    case types.NodeKind.AssignExpr:
      return types.AssignExpr;
    case types.NodeKind.AssignPat:
      return types.AssignPat;
    case types.NodeKind.AssignPatProp:
      return types.AssignPatProp;
    case types.NodeKind.AssignProp:
      return types.AssignProp;
    case types.NodeKind.AwaitExpr:
      return types.AwaitExpr;
    case types.NodeKind.BigInt:
      return types.BigInt;
    case types.NodeKind.BinExpr:
      return types.BinExpr;
    case types.NodeKind.BindingIdent:
      return types.BindingIdent;
    case types.NodeKind.BlockStmt:
      return types.BlockStmt;
    case types.NodeKind.Bool:
      return types.Bool;
    case types.NodeKind.BreakStmt:
      return types.BreakStmt;
    case types.NodeKind.CallExpr:
      return types.CallExpr;
    case types.NodeKind.CatchClause:
      return types.CatchClause;
    case types.NodeKind.Class:
      return types.Class;
    case types.NodeKind.ClassDecl:
      return types.ClassDecl;
    case types.NodeKind.ClassExpr:
      return types.ClassExpr;
    case types.NodeKind.ClassMethod:
      return types.ClassMethod;
    case types.NodeKind.ClassProp:
      return types.ClassProp;
    case types.NodeKind.ComputedPropName:
      return types.ComputedPropName;
    case types.NodeKind.CondExpr:
      return types.CondExpr;
    case types.NodeKind.Constructor:
      return types.Constructor;
    case types.NodeKind.ContinueStmt:
      return types.ContinueStmt;
    case types.NodeKind.DebuggerStmt:
      return types.DebuggerStmt;
    case types.NodeKind.Decorator:
      return types.Decorator;
    case types.NodeKind.DoWhileStmt:
      return types.DoWhileStmt;
    case types.NodeKind.EmptyStmt:
      return types.EmptyStmt;
    case types.NodeKind.ExportAll:
      return types.ExportAll;
    case types.NodeKind.ExportDecl:
      return types.ExportDecl;
    case types.NodeKind.ExportDefaultDecl:
      return types.ExportDefaultDecl;
    case types.NodeKind.ExportDefaultExpr:
      return types.ExportDefaultExpr;
    case types.NodeKind.ExportDefaultSpecifier:
      return types.ExportDefaultSpecifier;
    case types.NodeKind.ExportNamedSpecifier:
      return types.ExportNamedSpecifier;
    case types.NodeKind.ExportNamespaceSpecifier:
      return types.ExportNamespaceSpecifier;
    case types.NodeKind.ExprOrSpread:
      return types.ExprOrSpread;
    case types.NodeKind.ExprStmt:
      return types.ExprStmt;
    case types.NodeKind.FnDecl:
      return types.FnDecl;
    case types.NodeKind.FnExpr:
      return types.FnExpr;
    case types.NodeKind.ForInStmt:
      return types.ForInStmt;
    case types.NodeKind.ForOfStmt:
      return types.ForOfStmt;
    case types.NodeKind.ForStmt:
      return types.ForStmt;
    case types.NodeKind.Function:
      return types.Function;
    case types.NodeKind.GetterProp:
      return types.GetterProp;
    case types.NodeKind.Ident:
      return types.Ident;
    case types.NodeKind.IfStmt:
      return types.IfStmt;
    case types.NodeKind.ImportDecl:
      return types.ImportDecl;
    case types.NodeKind.ImportDefaultSpecifier:
      return types.ImportDefaultSpecifier;
    case types.NodeKind.ImportNamedSpecifier:
      return types.ImportNamedSpecifier;
    case types.NodeKind.ImportStarAsSpecifier:
      return types.ImportStarAsSpecifier;
    case types.NodeKind.Invalid:
      return types.Invalid;
    case types.NodeKind.JSXAttr:
      return types.JSXAttr;
    case types.NodeKind.JSXClosingElement:
      return types.JSXClosingElement;
    case types.NodeKind.JSXClosingFragment:
      return types.JSXClosingFragment;
    case types.NodeKind.JSXElement:
      return types.JSXElement;
    case types.NodeKind.JSXEmptyExpr:
      return types.JSXEmptyExpr;
    case types.NodeKind.JSXExprContainer:
      return types.JSXExprContainer;
    case types.NodeKind.JSXFragment:
      return types.JSXFragment;
    case types.NodeKind.JSXMemberExpr:
      return types.JSXMemberExpr;
    case types.NodeKind.JSXNamespacedName:
      return types.JSXNamespacedName;
    case types.NodeKind.JSXOpeningElement:
      return types.JSXOpeningElement;
    case types.NodeKind.JSXOpeningFragment:
      return types.JSXOpeningFragment;
    case types.NodeKind.JSXSpreadChild:
      return types.JSXSpreadChild;
    case types.NodeKind.JSXText:
      return types.JSXText;
    case types.NodeKind.KeyValuePatProp:
      return types.KeyValuePatProp;
    case types.NodeKind.KeyValueProp:
      return types.KeyValueProp;
    case types.NodeKind.LabeledStmt:
      return types.LabeledStmt;
    case types.NodeKind.MemberExpr:
      return types.MemberExpr;
    case types.NodeKind.MetaPropExpr:
      return types.MetaPropExpr;
    case types.NodeKind.MethodProp:
      return types.MethodProp;
    case types.NodeKind.Module:
      return types.Module;
    case types.NodeKind.NamedExport:
      return types.NamedExport;
    case types.NodeKind.NewExpr:
      return types.NewExpr;
    case types.NodeKind.Null:
      return types.Null;
    case types.NodeKind.Number:
      return types.Number;
    case types.NodeKind.ObjectLit:
      return types.ObjectLit;
    case types.NodeKind.ObjectPat:
      return types.ObjectPat;
    case types.NodeKind.OptChainExpr:
      return types.OptChainExpr;
    case types.NodeKind.Param:
      return types.Param;
    case types.NodeKind.ParenExpr:
      return types.ParenExpr;
    case types.NodeKind.PrivateMethod:
      return types.PrivateMethod;
    case types.NodeKind.PrivateName:
      return types.PrivateName;
    case types.NodeKind.PrivateProp:
      return types.PrivateProp;
    case types.NodeKind.Regex:
      return types.Regex;
    case types.NodeKind.RestPat:
      return types.RestPat;
    case types.NodeKind.ReturnStmt:
      return types.ReturnStmt;
    case types.NodeKind.Script:
      return types.Script;
    case types.NodeKind.SeqExpr:
      return types.SeqExpr;
    case types.NodeKind.SetterProp:
      return types.SetterProp;
    case types.NodeKind.SpreadElement:
      return types.SpreadElement;
    case types.NodeKind.StaticBlock:
      return types.StaticBlock;
    case types.NodeKind.Str:
      return types.Str;
    case types.NodeKind.Super:
      return types.Super;
    case types.NodeKind.SwitchCase:
      return types.SwitchCase;
    case types.NodeKind.SwitchStmt:
      return types.SwitchStmt;
    case types.NodeKind.TaggedTpl:
      return types.TaggedTpl;
    case types.NodeKind.ThisExpr:
      return types.ThisExpr;
    case types.NodeKind.ThrowStmt:
      return types.ThrowStmt;
    case types.NodeKind.Tpl:
      return types.Tpl;
    case types.NodeKind.TplElement:
      return types.TplElement;
    case types.NodeKind.TryStmt:
      return types.TryStmt;
    case types.NodeKind.TsArrayType:
      return types.TsArrayType;
    case types.NodeKind.TsAsExpr:
      return types.TsAsExpr;
    case types.NodeKind.TsCallSignatureDecl:
      return types.TsCallSignatureDecl;
    case types.NodeKind.TsConditionalType:
      return types.TsConditionalType;
    case types.NodeKind.TsConstAssertion:
      return types.TsConstAssertion;
    case types.NodeKind.TsConstructSignatureDecl:
      return types.TsConstructSignatureDecl;
    case types.NodeKind.TsConstructorType:
      return types.TsConstructorType;
    case types.NodeKind.TsEnumDecl:
      return types.TsEnumDecl;
    case types.NodeKind.TsEnumMember:
      return types.TsEnumMember;
    case types.NodeKind.TsExportAssignment:
      return types.TsExportAssignment;
    case types.NodeKind.TsExprWithTypeArgs:
      return types.TsExprWithTypeArgs;
    case types.NodeKind.TsExternalModuleRef:
      return types.TsExternalModuleRef;
    case types.NodeKind.TsFnType:
      return types.TsFnType;
    case types.NodeKind.TsGetterSignature:
      return types.TsGetterSignature;
    case types.NodeKind.TsImportEqualsDecl:
      return types.TsImportEqualsDecl;
    case types.NodeKind.TsImportType:
      return types.TsImportType;
    case types.NodeKind.TsIndexSignature:
      return types.TsIndexSignature;
    case types.NodeKind.TsIndexedAccessType:
      return types.TsIndexedAccessType;
    case types.NodeKind.TsInferType:
      return types.TsInferType;
    case types.NodeKind.TsInterfaceBody:
      return types.TsInterfaceBody;
    case types.NodeKind.TsInterfaceDecl:
      return types.TsInterfaceDecl;
    case types.NodeKind.TsIntersectionType:
      return types.TsIntersectionType;
    case types.NodeKind.TsKeywordType:
      return types.TsKeywordType;
    case types.NodeKind.TsLitType:
      return types.TsLitType;
    case types.NodeKind.TsMappedType:
      return types.TsMappedType;
    case types.NodeKind.TsMethodSignature:
      return types.TsMethodSignature;
    case types.NodeKind.TsModuleBlock:
      return types.TsModuleBlock;
    case types.NodeKind.TsModuleDecl:
      return types.TsModuleDecl;
    case types.NodeKind.TsNamespaceDecl:
      return types.TsNamespaceDecl;
    case types.NodeKind.TsNamespaceExportDecl:
      return types.TsNamespaceExportDecl;
    case types.NodeKind.TsNonNullExpr:
      return types.TsNonNullExpr;
    case types.NodeKind.TsOptionalType:
      return types.TsOptionalType;
    case types.NodeKind.TsParamProp:
      return types.TsParamProp;
    case types.NodeKind.TsParenthesizedType:
      return types.TsParenthesizedType;
    case types.NodeKind.TsPropertySignature:
      return types.TsPropertySignature;
    case types.NodeKind.TsQualifiedName:
      return types.TsQualifiedName;
    case types.NodeKind.TsRestType:
      return types.TsRestType;
    case types.NodeKind.TsSetterSignature:
      return types.TsSetterSignature;
    case types.NodeKind.TsThisType:
      return types.TsThisType;
    case types.NodeKind.TsTplLitType:
      return types.TsTplLitType;
    case types.NodeKind.TsTupleElement:
      return types.TsTupleElement;
    case types.NodeKind.TsTupleType:
      return types.TsTupleType;
    case types.NodeKind.TsTypeAliasDecl:
      return types.TsTypeAliasDecl;
    case types.NodeKind.TsTypeAnn:
      return types.TsTypeAnn;
    case types.NodeKind.TsTypeAssertion:
      return types.TsTypeAssertion;
    case types.NodeKind.TsTypeLit:
      return types.TsTypeLit;
    case types.NodeKind.TsTypeOperator:
      return types.TsTypeOperator;
    case types.NodeKind.TsTypeParam:
      return types.TsTypeParam;
    case types.NodeKind.TsTypeParamDecl:
      return types.TsTypeParamDecl;
    case types.NodeKind.TsTypeParamInstantiation:
      return types.TsTypeParamInstantiation;
    case types.NodeKind.TsTypePredicate:
      return types.TsTypePredicate;
    case types.NodeKind.TsTypeQuery:
      return types.TsTypeQuery;
    case types.NodeKind.TsTypeRef:
      return types.TsTypeRef;
    case types.NodeKind.TsUnionType:
      return types.TsUnionType;
    case types.NodeKind.UnaryExpr:
      return types.UnaryExpr;
    case types.NodeKind.UpdateExpr:
      return types.UpdateExpr;
    case types.NodeKind.VarDecl:
      return types.VarDecl;
    case types.NodeKind.VarDeclarator:
      return types.VarDeclarator;
    case types.NodeKind.WhileStmt:
      return types.WhileStmt;
    case types.NodeKind.WithStmt:
      return types.WithStmt;
    case types.NodeKind.YieldExpr:
      return types.YieldExpr;
    default:
      throw new Error("Unknown node kind: " + node.kind);
  }
}
