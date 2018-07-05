import * as ts from 'typescript';
import {MemberInfo, MemberType} from '../../types';
import {getReferencingMethods} from './getReferencingMethods';
import {TypescriptAst} from './TypescriptAst';

export function getClassMembers(myClass: ts.ClassDeclaration, ast: TypescriptAst): MemberInfo[] {
  const dependencies = getDependencies(myClass);
  const properMethods = myClass.members.filter<ts.MethodDeclaration>(ts.isMethodDeclaration);
  const functionProperties = myClass.members
    .filter<ts.PropertyDeclaration>(ts.isPropertyDeclaration)
    .filter(x => x.initializer && ts.isArrowFunction(x.initializer));
  const methods = (properMethods as ts.NamedDeclaration[]).concat(functionProperties);
  const privateMethods = filterByScope(methods, ts.ModifierFlags.Private);
  const publicMethods = methods.filter(x => !privateMethods.includes(x));

  return [
    ...getInfos(dependencies, MemberType.dependency),
    ...getInfos(privateMethods, MemberType.privateMethod),
    ...getInfos(publicMethods, MemberType.publicMethod)
  ];

  function getInfos(nodes: ts.NamedDeclaration[], type: MemberType): MemberInfo[] {
    return nodes
      .map(x => ({
        label: ast.getName(x),
        type: type,
        referencingMethods: getReferencingMethods(x, myClass, ast).map(ast.getName)
      }));
  }
}

function getDependencies(myClass: ts.ClassDeclaration) {
  const constructor = myClass.members.find<ts.ConstructorDeclaration>(ts.isConstructorDeclaration);
  if (!constructor) {
    return [];
  }
  const constructorParameters = constructor.parameters;
  const privateConstructorParameters = filterByScope(constructorParameters, ts.ModifierFlags.Private);
  return privateConstructorParameters;
}

function filterByScope<T extends ts.Node>(nodes: ReadonlyArray<T>, scope: ts.ModifierFlags): T[] {
  return nodes.filter(x => {
    const flags = ts.getCombinedModifierFlags(x);
    return flags & scope;
  });
}