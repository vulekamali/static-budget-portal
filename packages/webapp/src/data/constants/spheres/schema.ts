import faker from 'faker';

/**
 * An array of all sphere IDs.
 */
export type TspheresIdsList = [TsphereId, TsphereId, TsphereId];
export const sphereIdsList: TspheresIdsList = ['national', 'local', 'provincial'];

/**
 * An array of all sphere IDs.
 */
export type TsphereNamesList = [TsphereName, TsphereName, TsphereName];
export const sphereNamesList: TsphereNamesList = ['National', 'Local', 'Provincial'];

/**
 * A title-case name of a sphere of South African government. See https://www.etu.org.za/toolbox/docs/govern/spheres.html for a more detailed explaination.
 */
export type TsphereName = 'National' | 'Local' | 'Provincial';
export const mockSphereName = (index): TsphereName =>
  index ? sphereNamesList[index] : faker.random.arrayElement(sphereNamesList);

/**
 * A kebab-case ID of a sphere of South African government. See https://www.etu.org.za/toolbox/docs/govern/spheres.html for a more detailed explaination.
 */
export type TsphereId = 'national' | 'local' | 'provincial';
export const mockSphereId = (index): TsphereId =>
  index ? sphereIdsList[index] : faker.random.arrayElement(sphereIdsList);

/**
 * Mapping of all information associated with a specific sphere.
 */
export type TsphereDataRelationship = {
  id: TsphereId;
  name: TsphereName;
};

export const mockSphereDataRelationship = (overrideIndex): TsphereDataRelationship => {
  const index = overrideIndex || faker.random.number({ min: 0, max: 2 });

  return {
    id: mockSphereId(index),
    name: mockSphereName(index),
  };
};

/**
 * The shape of the hardcoded project-wide provinces object.
 */
export type TspheresData = {
  ids: TspheresIdsList;
  names: TsphereNamesList;
  relationships: TsphereDataRelationship[];
};

export const sphereData: TspheresData = {
  ids: sphereIdsList,
  names: sphereNamesList,
  relationships: [0, 1, 2].map(mockSphereDataRelationship),
};
