import faker from 'faker';

/**
 * An array of all province IDs.
 */
export type TprovinceIdList = TprovinceId[];
export const provinceIdList = [
  'eastern-cape',
  'free-state',
  'gauteng',
  'kwazulu-natal',
  'limpopo',
  'mpumalanga',
  'north-west',
  'northern-cape',
  'western-cape',
];

/**
 * An array of all province IDs.
 */
export type TprovinceNamesList = TprovinceName[];
export const provinceNamesList = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape',
];

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

export const mockProvinceId = index =>
  provinceIdList[index] || faker.random.arrayElement(provinceIdList);

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

export const mockProvinceName = index =>
  provinceNamesList[index] || faker.random.arrayElement(provinceIdList);

/**
 * Mapping of all information associated with a specific province.
 */
export type TprovinceDataRelationship = {
  id: TprovinceId;
  name: TprovinceName;
};

/**
 * The shape of the hardcoded project-wide provinces object.
 */
export type TprovincesData = {
  ids: TprovinceIdList;
  names: TprovinceNamesList;
  relationships: TprovinceDataRelationship[];
};

export const provincesData = {
  ids: provinceIdList,
  names: provinceNamesList,
  relationships: provinceIdList.map((id, index) => ({
    id,
    name: provinceNamesList[index],
  })),
};
