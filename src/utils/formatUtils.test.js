import formatUtils from './formatUtils';

describe('#xmlToJson', () => {
  it('正常系', () => {
    const input = `<?xml version="1.0"?>
<Test>
  <Layer1a>1階層</Layer1a>
  <Layer1b>
    <Layer2b>2階層</Layer2b>
  </Layer1b>
  <Layer1c>
    <Layer2c>
      <Layer3c>3階層</Layer3c>
    </Layer2c>
  </Layer1c>
</Test>`;
    const expected = {
      Test: {
        Layer1a: {
          _text: '1階層',
        },
        Layer1b: {
          Layer2b: {
            _text: '2階層',
          },
        },
        Layer1c: {
          Layer2c: {
            Layer3c: {
              _text: '3階層',
            },
          },
        },
      },
    };
    const result = formatUtils.xmlToJson(input);
    expect(result).toMatchObject(expected);
  });
});

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
