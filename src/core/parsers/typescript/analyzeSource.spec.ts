import {analyzeSource} from './analyzeSource';
import {MemberType} from '../../types';

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

describe('analyzeSource', function() {
  it('analyzes members correctly', function() {
    const result = analyzeSource(code);

    expect(result).toEqual(expect.arrayContaining([
      { label: 'depA', type: MemberType.dependency, referencingMethods: ['methodC'] },
      { label: 'depB', type: MemberType.dependency, referencingMethods: ['methodB', 'methodD'] },
      { label: 'methodA', type: MemberType.publicMethod, referencingMethods: ['methodB'] },
      { label: 'methodB', type: MemberType.publicMethod, referencingMethods: [] },
      { label: 'methodD', type: MemberType.publicMethod, referencingMethods: [] },
      { label: 'methodF', type: MemberType.publicMethod, referencingMethods: [] },
      { label: 'methodC', type: MemberType.privateMethod, referencingMethods: ['methodA', 'methodE'] },
      { label: 'methodE', type: MemberType.privateMethod, referencingMethods: ['methodF'] },
    ]));
  });
});
