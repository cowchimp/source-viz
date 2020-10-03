import { MemberInfo } from '../../../types';
import { TypescriptAst } from '../TypescriptAst';
import { getImports } from './getImports';
import { getTopLevelFunctions } from './getTopLevelFunctions';
import { getTopLevelFunctionVariables } from './getTopLevelFunctionVariables';

export function analyzeModuleSource(code: string): MemberInfo[] {
  const ast = new TypescriptAst(code);
  const members = [
    ...getImports(ast),
    ...getTopLevelFunctions(ast),
    ...getTopLevelFunctionVariables(ast),
  ];
  return members.map((x) => x.getMemberInfo(ast, members));
}
