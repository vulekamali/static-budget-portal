import { h } from 'preact';


export default function HorisontalBreakpoint({ styling, totalGroupSpace, rank }) {
  const { valueSpace, buffer, padding, labelBreakpoints } = styling;
  const iteration = (valueSpace - buffer) / labelBreakpoints;

  return (
    <rect
      x={padding[3] + buffer + (rank * iteration)}
      y={padding[0] + totalGroupSpace + (buffer * 2)}
      height={padding[2] - buffer}
      width={iteration}
      fill="none"
      stroke="red"
      opacity="0.5"
    />
  );
}
