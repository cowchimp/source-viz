import {MemberInfo, MemberType} from './types';
import {getDescendants} from './utils/getDescendants';
import {getUniques} from './utils/getUniques';
import {MapLike} from 'typescript/lib/typescript';

export function groupPublicMethodsToReferencedMembers(members: MemberInfo[], transitiveLinkFilters: Set<MemberType>): Map<MemberInfo, MemberInfo[]> {
  const referencingMethodsToMembers = getReferencingMethodsToMembers(members);

  return members
    .filter(x => x.type == MemberType.publicMethod)
    .reduce((acc, publicMethod) => {
      const linkedMembers = getMembersTransitively(publicMethod, transitiveLinkFilters, m => referencingMethodsToMembers.get(m) || []);
      acc.set(publicMethod, linkedMembers);
      return acc;
    }, new Map<MemberInfo, MemberInfo[]>());
}

function getMembersTransitively(root: MemberInfo, transitiveLinkFilters: Set<MemberType>, getReferencedMembers: (m: MemberInfo) => MemberInfo[]): MemberInfo[] {
  const referencedInRoot = getReferencedMembers(root);

  const descendants = getDescendants(root, m => {
    return getReferencedMembers(m).filter(x => transitiveLinkFilters.has(x.type));
  });
  const referencedInDescendants = descendants.reduce((acc,x) => acc.concat(getReferencedMembers(x)), []);

  return getUniques(
    referencedInRoot,
    referencedInDescendants
  );
}

function getReferencingMethodsToMembers(members: MemberInfo[]): Map<MemberInfo, MemberInfo[]> {
  const ret = new Map<MemberInfo, MemberInfo[]>();
  const labelsToMembers = getLabelsToMembers(members);

  members.forEach(member => {
    member.referencingMethods.forEach(referencingMethodLabel => {
      const referencingMethod = labelsToMembers[referencingMethodLabel];

      if (!ret.has(referencingMethod)) {
        ret.set(referencingMethod, []);
      }
      ret.get(referencingMethod).push(member);
    });
  });
  return ret;
}

function getLabelsToMembers(members: MemberInfo[]): MapLike<MemberInfo> {
  return members.reduce((acc, m) => {
    acc[m.label] = m;
    return acc;
  }, {});
}
