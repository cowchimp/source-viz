import * as ts from 'typescript';
import {getClassMembers} from './getClassMembers';
import {MemberInfo} from '../../types';
import {TypescriptAst} from './TypescriptAst';

export function analyzeSource(code: string): MemberInfo[] {
  const ast = new TypescriptAst(code);
  const nodes = ast.nodes;
  const myClass = nodes.find<ts.ClassDeclaration>(ts.isClassDeclaration);
  return getClassMembers(myClass, ast);
}
