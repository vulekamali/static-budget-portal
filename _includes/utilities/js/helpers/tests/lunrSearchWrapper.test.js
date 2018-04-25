import lunrSearchWrapper from './../lunrSearchWrapper.js';


const array = [
  {
    value: 'impsum',
    id: '1',
  },
  {
    value: 'lorem',
    id: '2',
  },
  {
    value: 'impsum lorem',
    id: '3',
  },
  {
    value: 'example',
    id: '4',
  },
];

const expected = [
  {
    value: 'lorem',
    id: '2',
  },
  {
    value: 'impsum lorem',
    id: '3',
  },
];

const result = lunrSearchWrapper(array, 'id', 'value', 'lorem');

test('basic', () => {
  expect(result).toEqual(expected);
});
