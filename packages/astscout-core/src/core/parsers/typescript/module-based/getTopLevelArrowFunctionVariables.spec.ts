import { getTopLevelArrowFunctionVariables } from './getTopLevelArrowFunctionVariables';
import { MemberType } from '../../../types';
import { TypescriptAst } from '../TypescriptAst';

describe('getTopLevelArrowFunctionVariables', function () {
  it('returns exported arrow functions variables as public methods', function () {
    const code = `export const foo = () => {}`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelArrowFunctionVariables(ast).map((x) =>
      x.getMemberInfo(ast),
    );
    expect(result).toEqual([
      expect.objectContaining({
        label: 'foo',
        type: MemberType.publicMethod,
      }),
    ]);
  });

  it('returns non-exported arrow functions variables as private methods', function () {
    const code = `const foo = () => {}`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelArrowFunctionVariables(ast).map((x) =>
      x.getMemberInfo(ast),
    );
    expect(result).toEqual([
      expect.objectContaining({
        label: 'foo',
        type: MemberType.privateMethod,
      }),
    ]);
  });

  it('returns exported default arrow functions variables as public methods', function () {
    const code = `export default () => {}`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelArrowFunctionVariables(ast).map((x) =>
      x.getMemberInfo(ast),
    );
    expect(result).toEqual([
      expect.objectContaining({
        label: 'default',
        type: MemberType.publicMethod,
      }),
    ]);
  });

  it('does not return non-top-level arrow function variables as methods', function () {
    const code = `const foo => () => { const bar = () => { } }`;
    const ast = new TypescriptAst(code);
    const result = getTopLevelArrowFunctionVariables(ast).map((x) =>
      x.getMemberInfo(ast),
    );
    expect(result).not.toContainEqual(
      expect.objectContaining({ label: 'bar' }),
    );
  });
});
