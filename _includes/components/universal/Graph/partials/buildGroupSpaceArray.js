export default function buildGroupSpaceArray(items, styling) {
  const {
    lineGutter,
    barWidth,
    groupMargin,
    titleHeight,
  } = styling;

  return Object.keys(items).map((key) => {
    const value = items[key];

    const totalGutters = (value.length - 1) * lineGutter;
    const totalLineWidth = value.length * barWidth;

    return totalGutters + totalLineWidth + titleHeight + groupMargin;
  });
}
