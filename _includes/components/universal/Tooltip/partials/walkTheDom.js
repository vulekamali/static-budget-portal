export default function walkTheDom(node, func, year, source, regExpression) {
  const children = node.childNodes;

  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];

    if (childNode.tagName !== 'A') {
      walkTheDom(childNode, func, year, source, regExpression);
    }
  }

  func(node, year, source, regExpression);
}
