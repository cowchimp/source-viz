import {analyzeModuleSource} from './analyzeModuleSource';
import {MemberType} from '../../../types';

const code = `import depA from './depA';
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
}`;

describe('analyzeModuleSource', function() {
  it('analyzes members correctly', function() {
    const result = analyzeModuleSource(code);

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
