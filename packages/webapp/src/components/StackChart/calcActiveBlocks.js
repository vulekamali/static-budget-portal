const calcBlock = (threshold, scrollOffset, items) => {
  const extractNode = ({ htmlRef: { current }}) => current;
  const refsArray = items.map(extractNode);

  for (let index in refsArray) {
    const block = refsArray[index];
    const blockTopFromTop = block.offsetTop - threshold;
    const blockBottomFromTop = blockTopFromTop + block.clientHeight;

    if (scrollOffset > blockTopFromTop && scrollOffset < blockBottomFromTop) {
      return index;
    }
  }

  return null;
}

const calcActiveBlocks = (threshold, scrollOffset, items) => {
  const rootIndex = calcBlock(threshold, scrollOffset, items);
  const rootObject = rootIndex && items[rootIndex];

  if (!rootObject) {
    return { selected: null, zoom: null }
  }

  if (!rootObject.children) {
    return { selected: rootObject, zoom: null }
  }

  const childIndex = calcBlock(threshold, scrollOffset, rootObject.children);

  if (!childIndex && rootIndex - 1 < 0) {
    return null;
  }

  if (!childIndex) {
    return { selected: items[rootIndex - 1].children[rootObject.children.length - 1], zoom: items[rootIndex - 1].id }
  }

  return { selected: rootObject.children[childIndex], zoom: rootObject.id }
}

export default calcActiveBlocks;
