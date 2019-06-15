import {
  TprovinceId,
  TprovinceName,
  TprovinceIdList,
  TprovinceNamesList,
} from '../provinces/types';

/**
 * A kebab-case ID of a specific governing body in South African politics. These usually coincide
 * with specific spheres of government {@link TsphereId }.
 */
export type TgoverningBodyId = 'south-africa' | TprovinceId;

/**
 * A title-case name of a specific governing body in South African politics. These usually coincide
 * with specific spheres of government {@link TsphereId }.
 */
export type TgoverningBodyName = 'South Africa' | TprovinceName;

/**
 * An array of all governing body IDs.
 */
export type TgoverningBodyIdList = TprovinceIdList & [TgoverningBodyId];

/**
 * An array of all governing body IDs.
 */
export type TgoverningBodyNamesList = TprovinceNamesList & [TgoverningBodyName];

/**
 * Mapping of all information associated with a specific governing body.
 */
export type TgoverningBodyRelationship = {
  id: TgoverningBodyId;
  name: TgoverningBodyName;
};
