import {getTopLevelFunctions} from './getTopLevelFunctions';
import {MemberType} from '../../../types';
import {TypescriptAst} from '../TypescriptAst';

describe('getTopLevelFunctions', function() {
  it('returns exported functions declarations as public methods', function() {
    const code = `export function foo() {}`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelFunctions(ast).map(x => x.getMemberInfo(ast));
    expect(result).toEqual([expect.objectContaining({ label: 'foo', type: MemberType.publicMethod })]);
  });

  it('returns non-exported functions declarations as private methods', function() {
    const code = `function foo() {}`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelFunctions(ast).map(x => x.getMemberInfo(ast));
    expect(result).toEqual([expect.objectContaining({ label: 'foo', type: MemberType.privateMethod })]);
  });

  it('does not return non-top-level functions declarations as methods', function() {
    const code = `function foo() { function bar() { } }`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelFunctions(ast).map(x => x.getMemberInfo(ast));
    expect(result).not.toContainEqual(expect.objectContaining({ label: 'bar' }));
  });

  it('returns exported default named functions as public methods', function() {
    const code = `export default function foo() {}`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelFunctions(ast).map(x => x.getMemberInfo(ast));
    expect(result).toEqual([expect.objectContaining({ label: 'foo', type: MemberType.publicMethod })]);
  });

  it('returns exported default anonymous functions as public methods', function() {
    const code = `export default function() {}`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelFunctions(ast).map(x => x.getMemberInfo(ast));
    expect(result).toEqual([expect.objectContaining({ label: 'default', type: MemberType.publicMethod })]);
  });
});
