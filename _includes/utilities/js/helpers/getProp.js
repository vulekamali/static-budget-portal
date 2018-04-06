import decodeHtmlEntities from './decodeHtmlEntities.js';


const parseString = (string, parse) => {
  switch (parse) {
    case 'json': return JSON.parse(string);
    case 'int': return parseInt(string, 10);
    case 'bool': return string !== null;
    default: return string;
  }
};

export default function getProp(name, node, parse) {
  const result = decodeHtmlEntities(node.getAttribute(`data-${name}`));
  return parseString(result, parse);
}
