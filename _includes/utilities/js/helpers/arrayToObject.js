import removePropFromObject from './removePropFromObject.js';
import isObject from './isObject.js';


export default function arrayToObject(array, key, modifier) {
  return array.reduce(
    (result, val) => {
      if (Array.isArray(val)) {
        throw new Error('value can not be an array');
      }

      if (!isObject(val)) {
        return {
          ...result,
          [val]: modifier ? modifier(val, val) : val,
        };
      }

      if (Object.keys(val).length === 1) {
        return {
          ...result,
          [val[0]]: modifier ? modifier(val[0], val[0]) : val[0],
        };
      }

      if (!key) {
        throw new Error('if object has more than one property a key parameter is required')
      }

      if (Object.keys(val).length === 2) {
        const onlyKey = Object.keys(removePropFromObject(val, key))[0];

        return {
          ...result,
          [val[key]]: modifier ? modifier(val[onlyKey], onlyKey) : val[onlyKey],
        };
      }

      const sansKeyProp = removePropFromObject(val, key);

      return {
        ...result,
        [val[key]]: modifier ? modifier(sansKeyProp, key) : sansKeyProp,
      };
    },
    {},
  );
}
