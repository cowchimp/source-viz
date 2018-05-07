import * as ts from 'typescript';
import {TypescriptAst} from './TypescriptAst';

const code = `class Foo {
  private depC;

  constructor(
    private depA,
    private depB
  ) {

  }

  methodA() {
    return this.methodC();
  }

  public methodB() {
    console.log(this.methodA())
    const that = this;
    if (true) {
      that.depB.init();
    }
  }

  private methodC() {
    return this.depA.init();
  }

  public methodD() {
    this.depB.init();
  }

  private methodE() {
    return this.methodC();
  }

  public methodF() {
    return this.methodE();
  }
}

class Bar {
  constructor(
    private foo: Foo
  ) {}

  methodA() {
    console.log(this.foo.methodA());
  }
}`;

describe('TypescriptAst', function () {
  it('returns parent correctly', function () {
    const ast = new TypescriptAst(code);
    const myClass = ast.nodes.filter<ts.ClassDeclaration>(ts.isClassDeclaration)[0];
    const methodA = myClass.members
      .filter<ts.MethodDeclaration>(ts.isMethodDeclaration)
      .find(x => ts.isIdentifier(x.name) && x.name.text == 'methodA');

    const result = ast.getParent(methodA);

    expect(result).toBe(myClass);
  });
});
