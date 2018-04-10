import decodeHtmlEntities from './decodeHtmlEntities.js';


const parseString = (string, parse) => {
  switch (parse) {
    case 'json': return JSON.parse(string);
    case 'int': return parseInt(string, 10);
    default: return string;
  }
};

export default function getProp(name, node, parse) {
  const result = node.getAttribute(`data-${name}`);

  if (parse === 'bool') {
    return result !== null;
  }

  return parseString(decodeHtmlEntities(result), parse);
}
