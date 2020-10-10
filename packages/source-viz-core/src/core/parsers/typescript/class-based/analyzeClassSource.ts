import * as ts from 'typescript';
import { getClassMembers } from './getClassMembers';
import { MemberInfo } from '../../../types';
import { TypescriptAst } from '../TypescriptAst';

export function analyzeClassSource(code: string): MemberInfo[] {
  const ast = new TypescriptAst(code);
  const nodes = ast.nodes;
  const myClass = nodes.find<ts.ClassDeclaration>(ts.isClassDeclaration);
  if (!myClass) {
    return [];
  }
  const members = getClassMembers(myClass, ast);
  return members.map((x) => x.getMemberInfo(ast, members));
}
