export default function walkTheDom(node, func) {
  const children = node.childNodes;

  for (let i = 0; i < children.length; i++) {
    walkTheDom(children[i], func);
  }

  func(node);
}

