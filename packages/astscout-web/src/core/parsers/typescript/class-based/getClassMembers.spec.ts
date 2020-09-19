import * as ts from 'typescript';
import { getClassMembers } from './getClassMembers';
import { TypescriptAst } from '../TypescriptAst';
import { MemberType } from '../../../types';

describe('getClassMembers', function () {
  it('returns private constructor parameters as dependencies', function () {
    const code = `class Foo {
      private propA;
    
      constructor(
        private propB,
        public propC
      ) {}
    }`;
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const result = getClassMembers(myClass, ast).map((x) =>
      x.getMemberInfo(ast),
    );
    expect(result).toEqual([
      expect.objectContaining({
        label: 'propB',
        type: MemberType.dependency,
      }),
    ]);
  });

  it('returns private methods as such', function () {
    const code = `class Foo {
      private methodA() { }
      public methodB() { }
      methodC() { }
      protected methodD() { }
    }`;
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const result = getClassMembers(myClass, ast)
      .map((x) => x.getMemberInfo(ast))
      .filter((x) => x.type == MemberType.privateMethod)
      .map((x) => x.label);
    expect(result).toEqual(['methodA']);
  });

  it('returns any type of methods except private methods as public methods', function () {
    const code = `class Foo {
      private methodA() { }
      public methodB() { }
      methodC() { }
      protected methodD() { }
    }`;
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const result = getClassMembers(myClass, ast)
      .map((x) => x.getMemberInfo(ast))
      .filter((x) => x.type == MemberType.publicMethod)
      .map((x) => x.label);
    expect(result).toEqual(['methodB', 'methodC', 'methodD']);
  });

  it('returns class properties that are arrow functions as methods', function () {
    const code = `class Foo {
      private methodA() { }
      private methodB = () => { };
      public methodC() { }
      public methodD = () { };
    }`;
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const result = getClassMembers(myClass, ast).map((x) =>
      x.getMemberInfo(ast),
    );
    expect(result).toEqual([
      expect.objectContaining({
        label: 'methodA',
        type: MemberType.privateMethod,
      }),
      expect.objectContaining({
        label: 'methodB',
        type: MemberType.privateMethod,
      }),
      expect.objectContaining({
        label: 'methodC',
        type: MemberType.publicMethod,
      }),
      expect.objectContaining({
        label: 'methodD',
        type: MemberType.publicMethod,
      }),
    ]);
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
