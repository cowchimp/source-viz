import { getImports } from './getImports';
import { MemberType } from '../../../types';
import { TypescriptAst } from '../TypescriptAst';

describe('getImports', function () {
  it('returns default imports as dependencies', function () {
    const code = `import foo from './foo'`;
    const ast = new TypescriptAst(code);
    const result = getImports(ast).map((x) => x.getMemberInfo(ast));
    expect(result).toEqual([
      expect.objectContaining({
        label: 'foo',
        type: MemberType.dependency,
      }),
    ]);
  });

  it('returns named imports as dependencies', function () {
    const code = `import { foo, bar } from './foo-bar'`;
    const ast = new TypescriptAst(code);
    const result = getImports(ast).map((x) => x.getMemberInfo(ast));
    expect(result).toEqual([
      expect.objectContaining({
        label: 'foo',
        type: MemberType.dependency,
      }),
      expect.objectContaining({
        label: 'bar',
        type: MemberType.dependency,
      }),
    ]);
  });
});
