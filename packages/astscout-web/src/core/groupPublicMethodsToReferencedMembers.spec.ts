import { groupPublicMethodsToReferencedMembers } from './groupPublicMethodsToReferencedMembers';
import { MemberInfo, MemberType } from './types';

const somePublicMethod = {
  label: 'somePublicMethod',
  type: MemberType.publicMethod,
  referencingMethods: [],
};
const someOtherPublicMethod = {
  label: 'someOtherPublicMethod',
  type: MemberType.publicMethod,
  referencingMethods: ['somePublicMethod'],
};
const somePrivateMethod = {
  label: 'somePrivateMethod',
  type: MemberType.privateMethod,
  referencingMethods: ['somePublicMethod'],
};
const someDependency = {
  label: 'someDependency',
  type: MemberType.dependency,
  referencingMethods: ['somePublicMethod'],
};
const someOtherPrivateMethod = {
  label: 'someOtherPrivateMethod',
  type: MemberType.privateMethod,
  referencingMethods: ['somePrivateMethod'],
};
const someOtherDependency = {
  label: 'someOtherDependency',
  type: MemberType.dependency,
  referencingMethods: ['someOtherPrivateMethod'],
};
const someThirdPrivateMethod = {
  label: 'someThirdPrivateMethod',
  type: MemberType.privateMethod,
  referencingMethods: ['someOtherPrivateMethod'],
};

const set: MemberInfo[] = [
  somePublicMethod,
  someOtherPublicMethod,
  somePrivateMethod,
  someDependency,
  someOtherPrivateMethod,
  someOtherDependency,
  someThirdPrivateMethod,
];

describe('groupPublicMethodsToReferencedMembers', function () {
  describe('no transitive links are passed', function () {
    it('returns only directly referenced members', function () {
      const result = groupPublicMethodsToReferencedMembers(
        set,
        new Set<MemberType>(),
      );

      expect(result).toEqual(
        new Map<MemberInfo, MemberInfo[]>([
          [
            somePublicMethod,
            [someOtherPublicMethod, somePrivateMethod, someDependency],
          ],
          [someOtherPublicMethod, []],
        ]),
      );
    });
  });

  describe('private methods are used as transitive links', function () {
    it('returns directly referenced members as well as those referenced in private methods used', function () {
      const result = groupPublicMethodsToReferencedMembers(
        set,
        new Set<MemberType>([MemberType.privateMethod]),
      );

      expect(result).toEqual(
        new Map<MemberInfo, MemberInfo[]>([
          [
            somePublicMethod,
            [
              someOtherPublicMethod,
              somePrivateMethod,
              someDependency,
              someOtherPrivateMethod,
              someOtherDependency,
              someThirdPrivateMethod,
            ],
          ],
          [someOtherPublicMethod, []],
        ]),
      );
    });
  });
});
