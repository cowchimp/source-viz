import * as ts from 'typescript';
import { TypescriptAst } from '../TypescriptAst';
import { MemberType } from '../../../types';
import { TypescriptMember } from '../TypescriptMember';

export function getImports(ast: TypescriptAst): TypescriptMember[] {
  const imports = ast.nodes.filter<ts.ImportClause>(ts.isImportClause);
  const importNamedDeclarations: ts.NamedDeclaration[] = imports.reduce(
    (acc, importClause) => {
      if (importClause.name) {
        acc.push(importClause);
        return acc;
      }

      if (ts.isNamespaceImport(importClause.namedBindings)) {
        acc.push(importClause.namedBindings);
        return acc;
      }

      return acc.concat(importClause.namedBindings.elements);
    },
    [],
  );
  return importNamedDeclarations.map(
    (x) => new TypescriptMember(x, MemberType.dependency),
  );
}
