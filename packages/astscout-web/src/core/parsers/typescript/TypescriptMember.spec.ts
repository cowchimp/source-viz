import * as ts from 'typescript';
import { TypescriptAst } from './TypescriptAst';
import { TypescriptMember } from './TypescriptMember';
import { MemberType } from '../../types';

const code = `class Foo {
  constructor(
    private ghostBusters,
  ) { }

  public callGhostBustersIfNeeded() {
    if(isTheresSomethingStrangeInYourNeighborhood()) {
      this.ghostBusters.call();
    }

    if(isTheresSomethingWeirdAndItDontLookGood()) {
      this.ghostBusters.call();
    }
  }

  public handleGhostsIfNeeded() {
    this.callGhostBustersIfNeeded();
  }
}`;

describe('TypescriptMember', function () {
  describe('getMemberInfo', function () {
    describe('referencingMethods', function () {
      it('dedups multiple usages in same method', function () {
        const ast = new TypescriptAst(code);
        const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
        const parameter = myClass.members.find<ts.ConstructorDeclaration>(
          ts.isConstructorDeclaration,
        ).parameters[0];
        const member = new TypescriptMember(parameter, MemberType.dependency);
        const publicMethod = find(
          myClass.members,
          ts.isMethodDeclaration,
          'callGhostBustersIfNeeded',
        );
        const members = [
          new TypescriptMember(publicMethod, MemberType.publicMethod),
        ];
        const memberInfo = member.getMemberInfo(ast, members);
        const result = memberInfo.referencingMethods;
        expect(result).toEqual(['callGhostBustersIfNeeded']);
      });

      it("does not return the method when passed a method's root node", function () {
        const ast = new TypescriptAst(code);
        const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
        const method1 = find(
          myClass.members,
          ts.isMethodDeclaration,
          'callGhostBustersIfNeeded',
        );
        const member1 = new TypescriptMember(method1, MemberType.publicMethod);
        const method2 = find(
          myClass.members,
          ts.isMethodDeclaration,
          'handleGhostsIfNeeded',
        );
        const member2 = new TypescriptMember(method2, MemberType.publicMethod);
        const members = [member1, member2];
        const memberInfo = member1.getMemberInfo(ast, members);
        const result = memberInfo.referencingMethods;
        expect(result).toEqual(['handleGhostsIfNeeded']);
      });
    });
  });
});

function find<T extends ts.NamedDeclaration>(
  list: ReadonlyArray<ts.Node>,
  typeGuard: (n: ts.Node) => n is T,
  name: string,
): T {
  return list
    .filter<T>(typeGuard)
    .find((x) => x.name && ts.isIdentifier(x.name) && x.name.text == name);
}
