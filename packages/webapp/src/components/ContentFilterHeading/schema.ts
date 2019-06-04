import faker from 'faker';
import { Omit } from 'utility-types';
import { omit } from 'lodash';
import { Tprops as TdropdownBase, mockProps as mockDropdownBase } from '../FilterDropdown/schema';

export type Tdropdown = Omit<TdropdownBase, 'primary'>;
export const mockDropdown = () => omit(mockDropdownBase(), 'primary');

const conditionalValue = callback => (faker.random.boolean() ? callback() : null);

// Type: Ttitle
/**
 * Text that should be shown as the main text in the `<ContentFilterHeading />`
 * component. This is usually the type of content that is being filtered by this
 * component. For example: 'Western Cape Departments', 'Focus Areas'?
 */
export type Ttitle = string;
export const mockTitle = (): Ttitle => faker.commerce.productName();

// Type: Turl
/**
 * The link that directs to a page with more details from the department preview pages. If null, the button will be disabled.
 */

export type Turl = string;
export const mockUrl = (): Turl => faker.internet.url();

// Type: Tbutton
/**
 * Prop for the detailed analysis button. If null, no button will appear.
 */

export type Tbutton = {
  url?: Turl;
};

export const mockButton = (): Tbutton => ({
  url: mockUrl(),
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
