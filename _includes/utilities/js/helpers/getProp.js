import decodeHtmlEntities from './decodeHtmlEntities.js';

// Convert string to either JSON or number, depending on what is passed to 'parse'
const parseString = (string, parse) => {
  const escapedString = decodeHtmlEntities(string);

  switch (parse) {
    case 'json': return JSON.parse(escapedString);
    case 'number': return parseFloat(string, 10);
    default: return string;
  }
};


// Adds node to output if 'options.returnNode' is true
const calcOutput = (result, condition, node) => {
  if (!condition) {
    return result;
  }

  return {
    value: result,
    node,
  };
};

function getProp(name, node, options = {}) {
  // 'parse' is 'boolean'
  if (options.parse === 'boolean') {
    const value = node.getAttribute(`data-${name}`);
    const result = value !== null;
    return calcOutput(result, options.returnNode, node);
  }

  // 'parse' is node
  if (options.parse === 'node' && !options.loop) {
    const innerNode = node.querySelector(`[data-${name}]`);

    // No 'nodeParse' is set
    if (!options.nodeParse) {
      return innerNode;
    }

    // 'nodeParse' is set to 'innerHTML'
    if (options.nodeParse === 'innerHTML') {
      const result = innerNode.innerHTML;
      return calcOutput(result, options.returnNode, innerNode);
    }

    // 'nodeParse' is 'string' (default), 'JSON', boolean or 'number'
    const result = getProp(name, innerNode, { parse: options.nodeParse });
    return calcOutput(result, options.returnNode, innerNode);
  }

  // 'parse' is node and 'list' is set to true
  if (options.parse === 'node' && options.loop) {
    const innerNodesList = node.querySelectorAll(`[data-${name}]`);

    // No 'nodeParse' is set
    if (!options.nodeParse) {
      return innerNodesList;
    }

    if (options.nodeParse === 'innerHTML') {
      // No 'nodeParse' is set
      /* eslint-disable */
      let result = [];
      /* eslint-enable */

      for (let i = 0; i < innerNodesList.length; i++) {
        const innerNode = innerNodesList[i];

        result.push(innerNode.innerHTML);
      }

      return result;
    }

    // No 'nodeParse' is set
    /* eslint-disable */
    let result = [];
    /* eslint-enable */

    for (let i = 0; i < innerNodesList.length; i++) {
      const innerNode = innerNodesList[i];

      result.push(
        getProp(name, innerNode, { parse: options.nodeParse }),
      );
    }

    return result;
  }

  // 'parse' is 'string' (default), 'JSON' or 'number'
  const value = node.getAttribute(`data-${name}`);
  const result = parseString((value), options.parse);
  return calcOutput(result, options.returnNode, node);
}


export default getProp;
