import faker from 'faker';

import { TsphereId } from '../spheres/schema'; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  TprovinceId,
  TprovinceName,
  TprovinceIdList,
  provinceIdList,
  TprovinceNamesList,
  provinceNamesList,
} from '../provinces/schema';

/**
 * A kebab-case ID of a specific governing body in South African politics. These usually coincide with specific spheres of government {@link TsphereId }.
 */
export type TgoverningBodyId = 'south-africa' | TprovinceId;

/**
 * A title-case name of a specific governing body in South African politics. These usually coincide with specific spheres of government {@link TsphereId }.
 */
export type TgoverningBodyName = 'South Africa' | TprovinceName;

/**
 * An array of all governing body IDs.
 */
export type TgoverningBodyIdList = TprovinceIdList & [TgoverningBodyId];
export const governingBodyIdList = [...provinceIdList, 'south-africa'];

/**
 * An array of all governing body IDs.
 */
export type TgoverningBodyNamesList = TprovinceNamesList & [TgoverningBodyName];
export const governingBodyNamesList = [...provinceNamesList, 'South Africa'];

/**
 * Mapping of all information associated with a specific governing body.
 */
export type TgoverningBodyRelationship = {
  id: TgoverningBodyId;
  name: TgoverningBodyName;
};

export const mockGoverningBodyRelationship = index => ({
  id: governingBodyIdList[index],
  name: governingBodyNamesList[index],
});

/**
 * The shape of the hardcoded project-wide governing bodies object.
 */
export interface TgoverningBodiesConstantDataShape {
  ids: TgoverningBodyIdList;
  names: TgoverningBodyNamesList;
  relationships: TgoverningBodyRelationship[];
}

export const governingBodiesConstantDataShape = {
  ids: governingBodyIdList,
  names: governingBodyNamesList,
  relationships: governingBodyIdList.map((value, index) => mockGoverningBodyRelationship(index)),
};
