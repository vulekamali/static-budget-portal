export default function createGlossaryGroupedObject(rawObject) {
  const alphabetLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };


  const objectSkeleton = alphabetLetters.reduce(
    (result, letter) => {
      return {
        ...result,
        [letter]: [],
      };
    },
    {},
  );


  const populatedObject = Object.keys(rawObject).reduce(
    (result, phrase) => {
      const letter = phrase.match(/\w/i)[0].toLowerCase();

      return {
        ...result,

        [letter]: [
          ...result[letter],
          {
            phrase: toTitleCase(phrase),
            description: rawObject[phrase],
          },
        ],
      };
    },
    objectSkeleton,
  );


  const sortedObject = Object.keys(populatedObject).reduce(
    (result, letter) => {
      const sortedArray = result[letter].sort(
        (a, b) => a.phrase.localeCompare(b.phrase),
      );

      return {
        ...result,
        [letter]: sortedArray,
      };
    },
    populatedObject,
  );


  return sortedObject;
}

