import {getDescendants} from './getDescendants';

describe('getDescendants', function () {
  it('gets descendants correctly', function() {
    const map = new Map<string, string[]>();
    map.set('A', ['B', 'C']);
    map.set('B', ['C', 'D']);
    map.set('C', ['E']);
    map.set('E', ['F']);
    const expected = ['B', 'C', 'D', 'E', 'F'];

    const result = getDescendants('A', item => map.has(item) ? map.get(item) : []);

    expect(result).toHaveLength(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('is not fazed by recursive links', function() {
    const map = new Map<string, string[]>();
    map.set('A', ['B', 'C']);
    map.set('B', ['C', 'D']);
    map.set('C', ['E', 'C']);
    map.set('E', ['F']);
    const expected = ['B', 'C', 'D', 'E', 'F'];

    const result = getDescendants('A', item => map.has(item) ? map.get(item) : []);

    expect(result).toHaveLength(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
