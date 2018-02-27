export default function createSizeModifier(string) {
  switch (string) {
    case 'small': return 'is-small';
    default: return '';
  }
}
