export default function trimString(length, string) {
  const initialTrim = string.substr(0, length);
  const characterToLastSpace = Math.min(initialTrim.length, initialTrim.lastIndexOf(' '));

  return `${initialTrim.substr(0, characterToLastSpace)}...`;
}