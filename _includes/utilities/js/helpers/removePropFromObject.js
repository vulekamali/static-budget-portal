export default function removePropFromObject(object, key) {
  const newProps = Object.keys(object).filter(prop => key !== prop);

  const newObject = newProps.reduce(
    (result, innerKey) => {
      return {
        ...result,
        [innerKey]: object[innerKey],
      };
    },
    {},
  );

  return newObject;
}
