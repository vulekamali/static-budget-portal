export default function trimValues(value) {
  if (value > 1000000000000) {
    return `${Math.round(value / 1000000000000)} Trillion`;
  } else if (value > 1000000000) {
    return `${Math.round(value / 1000000000)} Billion`;
  } else if (value > 1000000) {
    return `${Math.round(value / 1000000)} Million`;
  } else if (value > 1000) {
    return `${Math.round(value / 1000)} Thousand`;
  }

  return value;
}
