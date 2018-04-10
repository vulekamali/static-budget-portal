import decodeHtmlEntities from './decodeHtmlEntities.js';


const parseString = (string, parse) => {
  switch (parse) {
    case 'json': return JSON.parse(string);
    case 'num': return parseFloat(string, 10);
    default: return string;
  }
};

export default function getProp(name, node, parse) {
  const result = node.getAttribute(`data-${name}`);
  if (result === null) {
    return null;
  }

  if (parse === 'bool') {
    return result !== null;
  }

  return parseString(decodeHtmlEntities(result), parse);
}
