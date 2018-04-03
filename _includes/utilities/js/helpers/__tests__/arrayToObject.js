import arrayToObject from './../arrayToObject.js';


test('is array of values', () => {
  expect(arrayToObject(['hello', 'world'])).toEqual(
    { hello: 'hello', world: 'world' },
  );
});

test('is array objects with 2 props', () => {
  expect(arrayToObject(
    [
      { name: 'hello', value: 'world' },
      { name: 'goodbye', value: 'world' },
    ],
    'name',
  )).toEqual(
    { hello: 'world', goodbye: 'world' },
  );
});

test('is array of objects with more than 2 props', () => {
  expect(arrayToObject([
    { name: 'hello', value: 'world', secondValue: 'suprise!' },
    { name: 'goodbye', value: 'world' },
  ])).toEqual(
    {
      hello: {
        value: 'world',
        secondValue: 'suprise',
      },
      goodbye: {
        value: 'world',
      },
    },
  );
});
