import faker from 'faker';

// Type: Ttheme
/**
 * Displays the two different types of dropdown styles that are available on the
 * designs. White versus grey. Can be either 'primary' or 'secondary'.
 */
export type Ttheme = string;
const mockTheme = (): Ttheme => 'primary';

// Type: Tselected
/**
 * This is the selected text for the menu item inside of the drop down. Being unique, it
 * also acts as the id.
 */

export type Tselected = string;

// Type: Toptions
/** */

export type Toptions = {
  id: ,
  text: ,
  disabled: ,
};
