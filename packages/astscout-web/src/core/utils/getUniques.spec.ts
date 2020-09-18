import {getUniques} from './getUniques';

describe('getUniques', function () {
  it('gets uniques correctly', function() {
    const expected = [1, 7, 3, 5, 9, 8];

    const result = getUniques([1, 7, 3], [5, 1], [9, 8, 3, 9]);

    expect(result).toHaveLength(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
