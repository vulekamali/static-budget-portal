/**
 * An array of all province IDs.
 */
export type TprovinceIdList = TprovinceId[];

/**
 * An array of all province IDs.
 */
export type TprovinceNamesList = TprovinceName[];

/**
 * An kebab-case ID used for a specific South African province (total of 9)
 */
export type TprovinceId =
  | 'eastern-cape'
  | 'free-state'
  | 'gauteng'
  | 'kwazulu-natal'
  | 'limpopo'
  | 'mpumalanga'
  | 'north-west'
  | 'northern-cape'
  | 'western-cape';

/**
 * The name of a specific South African province (total of 9)
 */
export type TprovinceName =
  | 'Eastern Cape'
  | 'Free State'
  | 'Gauteng'
  | 'KwaZulu Natal'
  | 'Limpopo'
  | 'Mpumalanga'
  | 'North West'
  | 'Northern Cape'
  | 'Western Cape';

/**
 * Mapping of all information associated with a specific province.
 */
export type TprovinceDataRelationship = {
  id: TprovinceId;
  name: TprovinceName;
};
