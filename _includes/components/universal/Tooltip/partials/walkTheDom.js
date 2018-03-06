export default function walkTheDom(node, func, source, regExpression) {
  const children = node.childNodes;

  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];

    if (childNode.tagName !== 'A') {
      walkTheDom(childNode, func, source, regExpression);
    }
  }

  func(node, source, regExpression);
}
