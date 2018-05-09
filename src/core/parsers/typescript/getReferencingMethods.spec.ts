import * as ts from 'typescript';
import {getReferencingMethods} from './getReferencingMethods';
import {TypescriptAst} from './TypescriptAst';

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
}

public class Bar {
  constructor(
    private foo: Foo
  ) {}

  methodA() {
    console.log(this.foo.handleGhostsIfNeeded());
  }
  
  public functionA = () => {
    const num = Math.floor(Math.random() * 1000);
    if (num % 2 == 0) {
      this.methodA();
    }
  };
}`;

describe('getReferencingMethods', function () {
  it('dedups multiple usages in same method', function() {
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const parameters = myClass.members.find<ts.ConstructorDeclaration>(ts.isConstructorDeclaration).parameters;
    const result = getReferencingMethods(parameters[0], myClass, ast).map(x => (x as any).name.text);
    expect(result).toEqual(['callGhostBustersIfNeeded']);
  });

  it("does not return the method when passed a method's root node", function() {
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const method = find(myClass.members, ts.isMethodDeclaration, 'callGhostBustersIfNeeded');
    const result = getReferencingMethods(method, myClass, ast).map(x => (x as any).name.text);
    expect(result).toEqual(['handleGhostsIfNeeded']);
  });

  it('does not return references in different classes', function() {
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Foo');
    const method = find(myClass.members, ts.isMethodDeclaration, 'handleGhostsIfNeeded');
    const result = getReferencingMethods(method, myClass, ast).map(x => (x as any).name.text);
    expect(result).toEqual([]);
  });

  it('treats class properties that are arrow functions as methods', function() {
    const ast = new TypescriptAst(code);
    const myClass = find(ast.nodes, ts.isClassDeclaration, 'Bar');
    const method = find(myClass.members, ts.isMethodDeclaration, 'methodA');
    const result = getReferencingMethods(method, myClass, ast).map(x => (x as any).name.text);
    expect(result).toEqual(['functionA']);
  });
});

function find<T extends ts.NamedDeclaration>(list: ReadonlyArray<ts.Node>, typeGuard: (n: ts.Node) => n is T, name: string): T {
  return list
    .filter<T>(typeGuard)
    .find(x => x.name && ts.isIdentifier(x.name) && x.name.text == name);
}