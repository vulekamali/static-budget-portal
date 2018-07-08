export default function breakIntoWrap(string, wrap) {
  const splitter = String(string).split(' ');

  let count = 0;
  let word = '';
  let results = [];

  for (let i = 0; i < splitter.length; i++) {
    if (splitter[count].length >= wrap) {
      results.push(splitter[count]);

      word = '';
      count++;
    } else {
      word = `${word} ${splitter[count]}`;
      count++;

      if (word.length >= wrap) {
        results.push(word);
        word = '';
      }

      if (i === splitter.length - 1) {
        results.push(word);
        word = '';
      }
    }
  }

  return results;
}
