import formatUtils from './formatUtils';

describe('#toArray', () => {
  it('1階層', () => {
    // prettier-ignore
    const input = {
      a: 1,
      b: 2,
    };
    // prettier-ignore
    const expected = [
      { a: 1 },
      { b: 2 },
    ];
    const result = formatUtils.toArray(input);
    expect(result).toMatchObject(expected);
  });
  it('2階層', () => {
    // prettier-ignore
    const input = {
      a: 1,
      b: {
        ba: 21,
        bb: 22,
      },
    };
    // prettier-ignore
    const expected = [
      { a: 1 },
      { b: [
        { ba: 21 },
        { bb: 22 },
      ]},
    ];
    const result = formatUtils.toArray(input);
    expect(result).toMatchObject(expected);
  });
  it('3階層', () => {
    // prettier-ignore
    const input = {
      a: 1,
      b: {
        ba: 21,
        bb: 22,
      },
      c: {
        ca: {
          caa: 311,
          cab: 312,
        },
        cb: {
          cba: 321,
          cbb: 322,
        },
      },
    };
    // prettier-ignore
    const expected = [
      { a: 1 },
      { b: [
        { ba: 21 },
        { bb: 22 },
      ]},
      {
        c: [
          { ca: [
            { caa: 311 },
            { cab: 312 },
          ]},
          { cb: [
            { cba: 321 },
            { cbb: 322 },
          ]},
        ],
      },
    ];
    const result = formatUtils.toArray(input);
    expect(result).toMatchObject(expected);
  });
});
