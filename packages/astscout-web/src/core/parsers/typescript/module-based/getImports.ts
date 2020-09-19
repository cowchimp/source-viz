import * as ts from 'typescript';
import * as difference from 'lodash.difference';
import { TypescriptAst } from '../TypescriptAst';
import { MemberType } from '../../../types';
import { TypescriptMember } from '../TypescriptMember';

export function getImports(ast: TypescriptAst): TypescriptMember[] {
  const imports = ast.nodes.filter<ts.ImportClause>(ts.isImportClause);
  const defaultImports = imports.filter((x) => x.name);
  const namedImports = difference(imports, defaultImports).reduce(
    (acc, importClause) => acc.concat(importClause.namedBindings.elements),
    [],
  );

  return [
    ...defaultImports.map(
      (x) => new TypescriptMember(x, MemberType.dependency),
    ),
    ...namedImports.map((x) => new TypescriptMember(x, MemberType.dependency)),
  ];
}
