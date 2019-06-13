/**
 * An array of all sphere IDs.
 */
export type TspheresIdsList = [TsphereId, TsphereId, TsphereId];

/**
 * An array of all sphere IDs.
 */
export type TsphereNamesList = [TsphereName, TsphereName, TsphereName];

/**
 * A title-case name of a sphere of South African government. See https://www.etu.org.za/toolbox/docs/govern/spheres.html for a more detailed explaination.
 */
export type TsphereName = 'National' | 'Local' | 'Provincial';

/**
 * A kebab-case ID of a sphere of South African government. See https://www.etu.org.za/toolbox/docs/govern/spheres.html for a more detailed explaination.
 */
export type TsphereId = 'national' | 'local' | 'provincial';

/**
 * Mapping of all information associated with a specific sphere.
 */
export type TsphereDataRelationship = {
  id: TsphereId;
  name: TsphereName;
};
