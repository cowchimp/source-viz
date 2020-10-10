import { AnalysisMode } from 'source-viz-core';

export const examples = {
  [AnalysisMode.class]: `class Foo {
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
}`,
  [AnalysisMode.module]: `import depA from './depA';
import depB from './depB';

const depC;

export function methodA() {
  return methodC();
}

export function methodB() {
  console.log(methodA());
  if (true) {
    depB.init();
  }
}

function methodC() {
  return depA.init();
}

export function methodD() {
  depB.init();
}

function methodE() {
  return methodC();
}

export function methodF() {
  return methodE();
}`,
};
