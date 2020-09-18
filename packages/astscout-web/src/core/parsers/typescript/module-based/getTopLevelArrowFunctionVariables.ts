import * as ts from 'typescript';
import * as difference from 'lodash.difference';
import {TypescriptAst} from '../TypescriptAst';
import {MemberType} from '../../../types';
import {TypescriptMember} from '../TypescriptMember';

export function getTopLevelArrowFunctionVariables(ast: TypescriptAst): TypescriptMember[] {
  const topLevelStatements = ast.nodes.find<ts.SourceFile>(ts.isSourceFile).statements;

  const arrowFunctionVariables = getArrowFunctionVariables(topLevelStatements);
  const publicArrowFunctionVariables = getArrowFunctionVariables(topLevelStatements, isPublic);
  const privateArrowFunctionVariables = difference(arrowFunctionVariables, publicArrowFunctionVariables);

  const defaultArrowFunction = getDefaultArrowFunction(topLevelStatements);
  if(defaultArrowFunction) {
    publicArrowFunctionVariables.push(defaultArrowFunction);
  }

  return [
    ...publicArrowFunctionVariables.map(x => new TypescriptMember(x, MemberType.publicMethod)),
    ...privateArrowFunctionVariables.map(x => new TypescriptMember(x, MemberType.privateMethod))
  ];
}

function getArrowFunctionVariables(nodes: ReadonlyArray<ts.Node>, filterFunc: (variableStatement: ts.VariableStatement) => boolean = () => true): ts.NamedDeclaration[] {
  return nodes
    .filter<ts.VariableStatement>(ts.isVariableStatement)
    .filter(filterFunc)
    .filter(x => x.declarationList.declarations.length == 1)
    .map<ts.VariableDeclaration>(x => x.declarationList.declarations[0])
    .filter(x => x.initializer && ts.isArrowFunction(x.initializer));
}

function isPublic(x: ts.Node): boolean {
  return x.modifiers && x.modifiers.some(m => m.kind == ts.SyntaxKind.ExportKeyword);
}

function getDefaultArrowFunction(topLevelStatements: ReadonlyArray<ts.Statement>): ts.ExportAssignment {
  return topLevelStatements.find<ts.ExportAssignment>(ts.isExportAssignment);
}
