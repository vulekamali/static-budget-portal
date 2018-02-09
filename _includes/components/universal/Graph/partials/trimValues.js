export default function trimValues(value) {
  if (value > 1000000000000) {
    return `${Math.ceil(value / 1000000000000)}T`;
  } else if (value > 1000000000) {
    return `${Math.ceil(value / 1000000000)}B`;
  } else if (value > 1000000) {
    return `${Math.ceil(value / 1000000)}M`;
  }

  return value;
}
