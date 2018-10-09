const calcIfObject = value => value !== null && typeof value === 'object';


const recursiveHeadingOverrides = (result, obj) => {
  Object.keys(obj).forEach((key) => {
    if (calcIfObject(obj[key])) {
      result.labels.push(`heading: ${key}`);
      result.values.push(0);

      return recursiveHeadingOverrides(result, obj[key]);
    }

    result.labels.push(key);
    result.values.push(obj[key]);
    return null;
  });
};


export default function flattenNesting(obj) {
  const result = { labels: [], values: [] };
  recursiveHeadingOverrides(result, obj);
  return result;
}

