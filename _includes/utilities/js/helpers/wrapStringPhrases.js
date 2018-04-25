export default function wrapStringPhrases(string, phrases, templateFn) {
  const sortFromLongToShort = (a, b) => b.length - a.length;
  const regExpTermsWithOrOperators = phrases.sort(sortFromLongToShort).join('|');
  const escapeRegExp = regexString => regexString.replace(/[\/\-\[\\\]\{\}\(\)\*\+\?\.\,\^\$\#\s]/gi, '\\$&');
  const regex = new RegExp(`(?:^|\\b)${escapeRegExp(regExpTermsWithOrOperators)}(?!\\w)`, 'gi');
  return string.replace(regex, templateFn);
}
