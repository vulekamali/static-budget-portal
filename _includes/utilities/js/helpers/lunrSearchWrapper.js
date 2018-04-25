import { intersectionBy } from 'lodash';
import lunr from 'lunr';
import wrapStringPhrases from './../../../utilities/js/helpers/wrapStringPhrases.js';


export default function lunrSearchWrapper(array, refProp, fieldProps, search, highlightTemplate) {

  // Normalises fieldProps into an array, even when passed as string
  const fieldPropsArray = Array.isArray(fieldProps) ? fieldProps : [fieldProps];


  // Create lunr index object
  const index = lunr(function () {
    fieldPropsArray.forEach(prop => this.field(prop));
    this.ref(refProp);
    array.forEach(object => this.add(object));
  });


  /* Perform lurn search and then change result to an
   * array with object that only have the 'ref' property,
   * but with the key changed to the same as the name of
   * the ref in the original array - this makes it easier
   * to run `intersectBy` between the two arrays (the
   * original array and the returned lunr array)
   */
  const rawResult = index.search(search);

  const renameProp = (val) => {
    return {
      [refProp]: val.ref,
    };
  };
  const normalisedResult = rawResult.map(renameProp);


  /* Returns copy of old array with values filtered out
   * in accordance to lunr
   */
  const result = intersectionBy(
    array,
    normalisedResult,
    object => object.id,
  );

  return result;
}
