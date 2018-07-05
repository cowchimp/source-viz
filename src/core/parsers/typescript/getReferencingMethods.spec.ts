import * as ts from 'typescript';
import {getReferencingMethods} from './getReferencingMethods';
import {TypescriptAst} from './TypescriptAst';
import {TypescriptMember} from './TypescriptMember';
import {MemberType} from '../../types';

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

describe('getReferencingMethods', function () {
  it('dedups multiple usages in same method', function() {
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const parameter = myClass.members.find<ts.ConstructorDeclaration>(ts.isConstructorDeclaration).parameters[0];
    const publicMethod = find(myClass.members, ts.isMethodDeclaration, 'callGhostBustersIfNeeded');
    const members = new TypescriptMember(publicMethod, MemberType.publicMethod);
    const result = getReferencingMethods(parameter, [members], ast);
    expect(result).toEqual(['callGhostBustersIfNeeded']);
  });

  it("does not return the method when passed a method's root node", function() {
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const method1 = find(myClass.members, ts.isMethodDeclaration, 'callGhostBustersIfNeeded');
    const method2 = find(myClass.members, ts.isMethodDeclaration, 'handleGhostsIfNeeded');
    const members = [method1, method2].map(x => new TypescriptMember(x, MemberType.publicMethod));
    const result = getReferencingMethods(method1, members, ast);
    expect(result).toEqual(['handleGhostsIfNeeded']);
  });
});

function find<T extends ts.NamedDeclaration>(list: ReadonlyArray<ts.Node>, typeGuard: (n: ts.Node) => n is T, name: string): T {
  return list
    .filter<T>(typeGuard)
    .find(x => x.name && ts.isIdentifier(x.name) && x.name.text == name);
}