import * as ts from 'typescript';
import * as difference from 'lodash.difference';
import { TypescriptAst } from '../TypescriptAst';
import { MemberType } from '../../../types';
import { TypescriptMember } from '../TypescriptMember';

export function getTopLevelFunctions(ast: TypescriptAst): TypescriptMember[] {
  const isPublic = (x: ts.Node) =>
    x.modifiers &&
    x.modifiers.some((m) => m.kind == ts.SyntaxKind.ExportKeyword);
  const topLevelStatements = ast.nodes.find<ts.SourceFile>(ts.isSourceFile)
    .statements;

  const functions = topLevelStatements.filter<ts.FunctionDeclaration>(
    ts.isFunctionDeclaration,
  );
  const publicFunctions = functions.filter(isPublic);
  const privateFunctions = difference(functions, publicFunctions);

  return [
    ...publicFunctions.map(
      (x) => new TypescriptMember(x, MemberType.publicMethod),
    ),
    ...privateFunctions.map(
      (x) => new TypescriptMember(x, MemberType.privateMethod),
    ),
  ];
}
