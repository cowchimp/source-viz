import * as ts from 'typescript';
import {getAncestors} from '../../utils/getAncestors';
import {TypescriptAst} from './TypescriptAst';

export function getReferencingMethods(node: ts.NamedDeclaration, parentClass: ts.ClassDeclaration, ast: TypescriptAst): ts.MethodDeclaration[] {
  if(!node.name || !ts.isIdentifier(node.name)) {
    return [];
  }
  const references = ast.getReferences(node.name);
  return Array.from(references.reduce((acc, reference) => {
    const ancestors = getAncestors(reference, node => ast.getParent(node));
    if(!ancestors.length) {
      return acc;
    }
    if(ancestors.includes(node)) {
      return acc;
    }
    const classIndex = ancestors.indexOf(parentClass);
    if(classIndex == -1) {
      return acc;
    }
    const classChild = ancestors[classIndex-1];
    if(!ts.isMethodDeclaration(classChild)) {
      return acc;
    }
    acc.add(classChild);
    return acc;
  }, new Set()));
}
