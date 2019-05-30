import faker from 'faker';
import { Omit } from 'utility-types';
import {
  TpresentationProps as TdropdownBase,
  mockPresentationprops as mockDropdownbBase,
} from '../FilterDropdown/schema';

export type Tdropdown = Omit<TdropdownBase, 'primary'>;
export const mockDropdown = mockDropdownbBase;

const conditionalValue = callback => (faker.random.boolean() ? callback() : null);
const createRandomLengthArray = (min, max, callback) =>
  new Array(faker.random.number({ min, max })).fill(true).map(callback);

// Type: Ttitle
/**
 * Text that should be shown as the main text in the `<ContentFilterHeading />`
 * component. This is usually the type of content that is being filtered by this
 * component. For example: 'Western Cape Departments', 'Focus Areas'?
 */
export type Ttitle = string;
export const mockTitle = (): Ttitle => faker.commerce.productName();

// Type: TbuttonUrl
/**
 * The URL that a user should be direct to once they click on the call-to-action
 * button.
 */
export type TbuttonUrl = string;
export const mockButtonUrl = (): TbuttonUrl => faker.internet.url();

// Type: TbuttonValue
/**
 * The text that should be shown in the call-to-action button.
 */
export type TbuttonValue = string;
export const mockButtonValue = (): TbuttonValue => faker.hacker.verb();

// Type: TbuttonValue
/**
 * All the data required to render a specific call-to-action button. This button
 * is usually associated with current data filtered by the year and seletion
 * filter dropdowns.
 *
 * Note that if `TbuttonValue` is present, but `TbuttonUrl` is not supplied the
 * button will be rendered with the supplied value as text inside it, however it
 * will be marked as disabled until a URL is supplied.
 */
export type Tbutton = {
  url?: TbuttonUrl;
  value: TbuttonValue;
};
export const mockButton = (): Tbutton => ({
  url: conditionalValue(mockButtonUrl),
  value: mockButtonValue(),
});

// Type: TpresentationProps
/**
 *  All props accepted by the `<Presentation />` sub-component inside
 *  `<ContentFilterHeading />`.
 */
export type TpresentationProps = {
  title?: Ttitle;
  selectionDropdown: Tdropdown;
  yearDropdown: Tdropdown;
  button?: Tbutton;
};

export const mockPresentationProps = (): TpresentationProps => ({
  title: conditionalValue(mockTitle),
  selectionDropdown: mockDropdown(),
  yearDropdown: mockDropdown(),
  button: conditionalValue(mockButton),
});

// Type: Tprops
/**
 * Renders a component that allows a user to control the filtering of data by
 * means of a year and selection filter. This is usually placed at the top of
 * the page in order to allow the user to control/dive into the information that
 * is shown on the page below it.
 */
export type Tprops = {
  title?: Ttitle;
  selectionDropdown: Tdropdown;
  yearDropdown: Tdropdown;
  button?: Tbutton;
};

export const mockProps = (): Tprops => ({
  title: conditionalValue(mockTitle),
  selectionDropdown: mockDropdown(),
  yearDropdown: mockDropdown(),
  button: conditionalValue(mockButton),
});
