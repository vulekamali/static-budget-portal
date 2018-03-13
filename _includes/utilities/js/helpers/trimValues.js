export default function trimValues(value, abbreviated) {
  const million = abbreviated ? 'm' : 'million';
  const billion = abbreviated ? 'bn' : 'billion';

  if (value > 1000000000) {
    return `${Math.round(value / 1000000000)} ${billion}`;
  } else if (value > 1000000) {
    return `${Math.round(value / 1000000)} ${million}`;
  }

  return Math.round(value);
}
