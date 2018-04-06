import decodeHtmlEntities from './decodeHtmlEntities.js';


export default function getProp(name, node, json) {
  const result = decodeHtmlEntities(node.getAttribute(`data-${name}`));
  return json ? JSON.parse(result) : result;
}
