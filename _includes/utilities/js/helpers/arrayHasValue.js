export default function arrayHasValue(array, value, key) {
  return array.reduce(
    (result, val) => {
      if (!key) {
        return val === value ? true : result;
      }

      return val[key] === value ? true : result;
    },
    false,
  );
}
