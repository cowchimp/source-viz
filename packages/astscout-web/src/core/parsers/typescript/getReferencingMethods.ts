import * as ts from 'typescript';
import {TypescriptMember} from './TypescriptMember';
import {TypescriptAst} from './TypescriptAst';
import {getAncestors} from '../../utils/getAncestors';
import {MemberType} from '../../types';

const validReferencingMemberTypes = [MemberType.privateMethod, MemberType.publicMethod];

export function getReferencingMethods(node: ts.NamedDeclaration, members: TypescriptMember[], ast: TypescriptAst): ts.NamedDeclaration[] {
  if (!node.name || !ts.isIdentifier(node.name) || !members.length) {
    return [];
  }

  const potentialReferencingMethods = members
    .filter(x => validReferencingMemberTypes.includes(x.type))
    .map(x => x.node);

  const references = ast.getReferences(node.name);
  return Array.from(references.reduce((acc, reference) => {
    const ancestors = getAncestors(reference, node => ast.getParent(node));
    if (ancestors.includes(node)) {
      return acc;
    }
    const referencingMethod = potentialReferencingMethods.find(x => ancestors.includes(x));
    if (referencingMethod) {
      acc.add(referencingMethod);
    }
    return acc;
  }, new Set<ts.NamedDeclaration>()));
}