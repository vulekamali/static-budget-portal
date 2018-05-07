import { JSDOM } from 'jsdom';
import getProp from './../getProp.js';


const wrapInShell = (string) => {
  return `<!DOCTYPE html><html><head></head><body>${string}</body></html>`;
};

const dom1 = new JSDOM(wrapInShell(`
<div id="test" data-test="123.123" data-json='{ "data": { "hello": 1, "world": 2 } }'>
  <div data-inner-test="345.345">Content 1</div>
  <div data-example="678.678">Content 2</div>
  <div data-example="91011.91011">Content 3</div>
  <div data-inner-json='{ "data": { "hello": true, "world": false } }'>Content 3</div>
</div>
`));
const node = dom1.window.document.getElementById('test');

const result1 = getProp('test', node);

test('string (default)', () => {
  expect(result1).toBe('123.123');
});

const result2 = getProp('test', node, { parse: 'string' });

test('string (default)', () => {
  expect(result2).toBe('123.123');
});

const result3 = getProp('test', node, { parse: 'number' });

test('number', () => {
  expect(result3).toBe(123.123);
});

const result33 = getProp('json', node, { parse: 'json' });

test('json', () => {
  expect(result33).toEqual({ data: { hello: 1, world: 2 } });
});

const result4 = getProp('test', node, { parse: 'boolean' });

test('boolean true', () => {
  expect(result4).toBe(true);
});

const result5 = getProp('test-error', node, { parse: 'boolean' });

test('boolean false', () => {
  expect(result5).toBe(false);
});

const result6 = getProp('inner-test', node, { parse: 'node' });

test('node', () => {
  expect(result6.outerHTML).toBe('<div data-inner-test="345.345">Content 1</div>');
});

const result7 = getProp('inner-test', node, { parse: 'node', nodeParse: 'string' });
test('node - string', () => {
  expect(result7).toBe('345.345');
});

const result8 = getProp('inner-test', node, { parse: 'node', nodeParse: 'number' });
test('node - number', () => {
  expect(result8).toBe(345.345);
});

const result9 = getProp('inner-test', node, { parse: 'node', nodeParse: 'innerHTML' });
test('node - innerHTML', () => {
  expect(result9).toBe('Content 1');
});

const result99 = getProp('inner-json', node, { parse: 'node', nodeParse: 'json' });
test('node - json', () => {
  expect(result99).toEqual({ data: { hello: true, world: false } });
});

const result10 = getProp('example', node, { parse: 'node', loop: true });
test('node - list', () => {
  expect([result10[0].outerHTML, result10[1].outerHTML])
    .toEqual(['<div data-example="678.678">Content 2</div>', '<div data-example="91011.91011">Content 3</div>']);
});


const result11 = getProp('example', node, { parse: 'node', nodeParse: 'string', loop: true });
test('node - list', () => {
  expect(result11)
    .toEqual(['678.678', '91011.91011']);
});

const result12 = getProp('example', node, { parse: 'node', nodeParse: 'number', loop: true });
test('node - list', () => {
  expect(result12)
    .toEqual([678.678, 91011.91011]);
});

const result13 = getProp('example', node, { parse: 'node', nodeParse: 'innerHTML', loop: true });
test('node - list', () => {
  expect(result13)
    .toEqual(['Content 2', 'Content 3']);
});
