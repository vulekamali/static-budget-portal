import isObject from './../isObject.js';


test('is object', () => {
  expect(isObject({ hello: 'world' })).toBe(true);
});

test('is string', () => {
  expect(isObject('hello world')).toBe(false);
});

test('is null', () => {
  expect(isObject(null)).toBe(false);
});
