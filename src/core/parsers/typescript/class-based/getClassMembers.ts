import * as ts from 'typescript';
import {MemberType} from '../../../types';
import {TypescriptAst} from '../TypescriptAst';
import {TypescriptMember} from '../TypescriptMember';

export function getClassMembers(myClass: ts.ClassDeclaration, ast: TypescriptAst): TypescriptMember[] {
  const dependencies = getDependencies(myClass);
  const properMethods = myClass.members.filter<ts.MethodDeclaration>(ts.isMethodDeclaration);
  const functionProperties = myClass.members
    .filter<ts.PropertyDeclaration>(ts.isPropertyDeclaration)
    .filter(x => x.initializer && ts.isArrowFunction(x.initializer));
  const methods = (properMethods as ts.NamedDeclaration[]).concat(functionProperties);
  const privateMethods = filterByScope(methods, ts.ModifierFlags.Private);
  const publicMethods = methods.filter(x => !privateMethods.includes(x));

  return [
    ...dependencies.map(x => new TypescriptMember(x, MemberType.dependency)),
    ...privateMethods.map(x => new TypescriptMember(x, MemberType.privateMethod)),
    ...publicMethods.map(x => new TypescriptMember(x, MemberType.publicMethod))
  ];
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

function filterByScope<T extends ts.Declaration>(nodes: ReadonlyArray<T>, scope: ts.ModifierFlags): T[] {
  return nodes.filter(x => {
    const flags = ts.getCombinedModifierFlags(x);
    return flags & scope;
  });
}