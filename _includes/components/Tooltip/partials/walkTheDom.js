export default function walkTheDom(node, func) {
  const children = node.childNodes;

  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];

    if (childNode.tagName !== 'A') {
      walkTheDom(childNode, func);
    }
  }

  func(node);
}

