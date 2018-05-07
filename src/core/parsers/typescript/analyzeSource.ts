import * as ts from 'typescript';
import {getReferencingMethods} from './getReferencingMethods';
import {MemberInfo, MemberType} from '../../types';
import {TypescriptAst} from './TypescriptAst';

export function analyzeSource(code: string): MemberInfo[] {
  const ast = new TypescriptAst(code);
  const nodes = ast.nodes;
  const myClass = nodes.filter<ts.ClassDeclaration>(ts.isClassDeclaration)[0];
  const constructorParameters = myClass.members.find<ts.ConstructorDeclaration>(ts.isConstructorDeclaration).parameters;
  const methods = myClass.members.filter<ts.MethodDeclaration>(ts.isMethodDeclaration);
  const privateMethods = filterByScope(methods, ts.ModifierFlags.Private);
  const publicMethods = methods.filter(x => !privateMethods.includes(x));

  return []
    .concat(populateModel(filterByScope(constructorParameters, ts.ModifierFlags.Private), MemberType.dependency, myClass, ast))
    .concat(populateModel(privateMethods, MemberType.privateMethod, myClass, ast))
    .concat(populateModel(publicMethods, MemberType.publicMethod, myClass, ast));
}

function populateModel(members: ReadonlyArray<ts.NamedDeclaration>, memberType: MemberType, parentClass: ts.ClassDeclaration, ast: TypescriptAst) {
  return members.map(m => ({
    label: (m as any).name.text,
    type: memberType,
    referencingMethods: getReferencingMethods(m, parentClass, ast).map(x => (x as any).name.text)
  }));
}

function filterByScope<T extends ts.Node>(nodes: ReadonlyArray<T>, scope: ts.ModifierFlags): T[] {
  return nodes.filter(x => {
    const flags = ts.getCombinedModifierFlags(x);
    return flags & scope;
  });
}