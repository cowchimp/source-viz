import {analyzeSource} from './analyzeSource';

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

    expect(result).toMatchSnapshot();
  });
});
