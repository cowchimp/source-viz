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
}`;

describe('getReferencingMethods', function () {
  it('dedups multiple usages in same method', function() {
    const ast = new TypescriptAst(code);
    const myClass = ast.nodes.filter<ts.ClassDeclaration>(ts.isClassDeclaration)[0];
    const parameters = myClass.members.find<ts.ConstructorDeclaration>(ts.isConstructorDeclaration).parameters;
    const result = getReferencingMethods(parameters[0], myClass, ast).map(x => (x as any).name.text);
    expect(result).toEqual(['callGhostBustersIfNeeded']);
  });

  it("does not return the method when passed a method's root node", function() {
    const ast = new TypescriptAst(code);
    const myClass = ast.nodes.filter<ts.ClassDeclaration>(ts.isClassDeclaration)[0];
    const method = myClass.members
      .filter<ts.MethodDeclaration>(ts.isMethodDeclaration)
      .find(x => ts.isIdentifier(x.name) && x.name.text == 'callGhostBustersIfNeeded');
    const result = getReferencingMethods(method, myClass, ast).map(x => (x as any).name.text);
    expect(result).toEqual(['handleGhostsIfNeeded']);
  });

  it('does not return references in different classes', function() {
    const ast = new TypescriptAst(code);
    const myClass = ast.nodes.filter<ts.ClassDeclaration>(ts.isClassDeclaration)[0];
    const method = myClass.members
      .filter<ts.MethodDeclaration>(ts.isMethodDeclaration)
      .find(x => ts.isIdentifier(x.name) && x.name.text == 'handleGhostsIfNeeded');
    const result = getReferencingMethods(method, myClass, ast).map(x => (x as any).name.text);
    expect(result).toEqual([]);
  });
});
