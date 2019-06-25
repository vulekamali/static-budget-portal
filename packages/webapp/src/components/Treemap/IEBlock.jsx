import React from 'react';
import { lighten } from 'polished';
import trimValues from '../../helpers/trimValues';


function makeLabel(x, y, width, height, text, isBold) {
  var fontSize = 14;
  var padding = 10;
  var estimatedWidth = text.length * (fontSize*0.6);
  if (estimatedWidth > width) {
    var estimatedFittingChars = Math.floor(width / fontSize);
    if (estimatedFittingChars < 4)
      return null;

    console.log("truncated", {width, text, estimatedWidth, chars: text.length, estimatedFittingChars});
    text = text.slice(0, estimatedFittingChars) + "...";
  } else {
    console.log("fine", {width, text, estimatedWidth});
  }
  const style = {fontSize, fontFamily: "Roboto, sans-serif", fontWeight: isBold ? "600" : '400'};
  return <text x={x + padding} y={y + fontSize + padding} style={style}>{text}</text>;
}


const IEBlock = props => {
  const {
    depth,
    x,
    y,
    id,
    url,
    width,
    height,
    color,
    selected,
    name,
    amount,
    changeSelectedHandler,
    children,
    root,
    zoom,
    icon,
  } = props;

  if (depth === 1) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
          }}
        />
        {makeLabel(x, y, width, height, name, true)}
        {makeLabel(x, y+19, width, height, `R${trimValues(amount, true)}`, false)}
      </g>
    );
  }

  if (depth === 2) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: 'none',
            stroke: lighten(0.1, color),
            strokeWidth: 1,
          }}
        />
      </g>
    );
  }

  // depth < 1
  return null;
};


export default IEBlock;
