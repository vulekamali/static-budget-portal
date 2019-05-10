import { createRef } from 'react';
import coloursList from './coloursList';

const sortItems = ({ amount: a }, { amount: b }) => b - a;

const sortChildrenOfItem = (item) => ({
  ...item,
  children: !item.children ? null : item.children.sort(sortItems),
});

const addColourToItemAndChildren = (item, index) => ({
  ...item,
  color: coloursList[index],
  children: !item.children ? null : item.children.map(child => addColourToItemAndChildren(child, index))
});

const addRefsToItemAndChildren = (item) => ({
  ...item,
  htmlRef: createRef(),
  headerRef: !!item.children && createRef(),
  children: !item.children ? null : item.children.map(child => addRefsToItemAndChildren(child))
});

const transformItems = (items) => {
  const sortedItems = items.sort(sortItems);
  const sortedChildren = sortedItems.map(sortChildrenOfItem);
  const withRefs = sortedChildren.map(addRefsToItemAndChildren);
  const withColours = withRefs.map(addColourToItemAndChildren);

  return withColours;
}

export default transformItems;
