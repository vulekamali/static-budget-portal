import { countryGpsBounds, vectorMapSizes } from './data.json';


const [absoluteMinX, absoluteMaxX] = countryGpsBounds.x;
const [absoluteMinY, absoluteMaxY] = countryGpsBounds.y;

const { initial, small } = vectorMapSizes

const convertGpsToVectorPoint = (props, size) => {
  const { 
    x: rawX = 23.378906, 
    y: rawY = -32.125471,
    id,
  } = props || {};

  const isSmall = size === 'small';

  const maxX = absoluteMaxX - absoluteMinX;
  const maxY = absoluteMaxY - absoluteMinY;

  const x = ((rawX - absoluteMinX) / maxX) * (isSmall ? small.x : initial.x);
  const y = initial.y - (((rawY - absoluteMinY) / maxY) * (isSmall ? small.y : initial.y));

  return { x, y, id };
}


export default convertGpsToVectorPoint;
