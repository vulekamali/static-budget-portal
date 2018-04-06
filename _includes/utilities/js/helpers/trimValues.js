export default function trimValues(value, abbreviated) {
  const million = abbreviated ? 'm' : 'million';
  const billion = abbreviated ? 'bn' : 'billion';

  if (value > 1000000000) {
    return `${(value / 1000000000).toFixed(1).replace(/\.0$/, '')} ${billion}`;
  } else if (value > 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')} ${million}`;
  }

  return value.toFixed(1).replace(/\.0$/, '');
}
