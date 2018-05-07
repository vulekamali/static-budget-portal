export default function wrapStringPhrases(string, phrasesArray, templateFn, options = {}) {
  // Removes phrases that have less charafter than 'minChars' if specified
  const removeIfNotEnoughChars = item => item.length > options.minChars;
  const returnAsIs = item => item;
  const phrases = phrasesArray.filter(options.minChars ? removeIfNotEnoughChars : returnAsIs);

  // Removes html from results if 'excludeHtml' is specified
  const excludeHtmlConfig = options && options.excludeHtml;
  const regexWrap = excludeHtmlConfig ? item => `(?!<[^<]*)${item}(?![^<>]*>)` : item => item;
  const splitString = excludeHtmlConfig ? '(?![^<>]*>)|(?!<[^<]*)' : '|';

  // Create regular experession string by concatenating all string in the phrases array with the regex 'or' operator.
  const sortFromLongToShort = (a, b) => b.length - a.length;
  const regexString = phrases
    // Sort from long to short (this allows Regex to prioritise longer phrases over shorter phrases)
    .sort(sortFromLongToShort)
    // Escapes all regex-specific operators from the regex string.
    .map(item => item.replace(/[\/\-\[\\\]\{\}\(\)\*\+\?\.\,\^\$\#\s]/gi, '\\$&'))
    .join(splitString);


  // Creates an actual regular expression from the regex string.
  const regex = new RegExp(regexWrap(regexString), 'gi');

  // Runs the passed function (regex match is automatically passed as the first parameter) on all matches of the regex and replaces the match with the function's return.
  return string.replace(regex, templateFn);
}
