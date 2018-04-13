export default function createSizeModifier(string) {
  switch (string) {
    case 'small': return ' is-small';
    case 'large': return ' is-large';
    default: return '';
  }
}
