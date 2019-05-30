import faker from 'faker';
import { Omit } from 'utility-types';

const createRandomLengthArray = (min, max, callback) =>
  new Array(faker.random.number({ min, max })).fill(true).map(callback);

const conditionalValue = callback => (faker.random.boolean() ? callback() : null);

// Type: ToptionValue
/**
 * A unique text value associated with an item displayed in the dropdown.
 */
export type ToptionValue = string;
export const mockValue = (): ToptionValue => faker.commerce.department();

// Type: Tdisabled
/**
 * Whether the associated `ToptionValue` inside a `Toption` should be disabled. If an
 * item is disabled it will be presented as greyed out and the user will not be
 * able to select it from the dropdown. There are use cases where you want to
 * show the entire range of options (i.e. you don't want to just list the
 * selectable options), however you want to communicate to the user that in a
 * specific item (although part of the range) is not selectable at the moment.
 */
export type Tdisabled = boolean;
export const mockDisabled = (): Tdisabled => faker.random.boolean();

// Type: Toption
/**
 * An object that contains all the information to render a single item in the
 * dropdown.
 */
export type Toption = {
  value: ToptionValue;
  disabled?: boolean;
};

export const mockOption = (): Toption => ({
  value: mockValue(),
  disabled: conditionalValue(mockDisabled),
});

// Type: TonSelectedChange
/**
 * A callback passed to the component that is fired whenever the selected item
 * is changed. Note that the callback passes `ToptionValue` from the associated
 * `Toption` into the callback and not the entire `Toption` object.
 */
export type TonSelectedChange = (ToptionValue) => void;
export const mockOnSelectedChange = (): TonSelectedChange => value => console.log(value);

// Type: Tprimary
/**
 * A prop that determines the visual importance the dropdown should have. If
 * true, then will render with a white background and black text, whereas it
 * renders with a grey background (less visual contrast) by default.
 */
export type Tprimary = boolean;
export const mockPrimary = (): Tprimary => faker.random.boolean();

// Type: Tloading
/**
 * If true then the dropdown will automatically be disabled (i.e. user will not
 * be able to interact with it). However a loading spinner will be rendered
 * inside the dropdown to indicate that it is currently loading data and will be
 * active data is received.
 */
export type Tloading = boolean;
export const mockLoading = (): Tloading => faker.random.boolean();

// Type: TpresentationProps
/**
 * All props accepted by the `<Presentation />` sub-component inside
 * `<FilterDropdown />`.
 */
export type TpresentationProps = {
  options: Toption[];
  selected: ToptionValue;
  changeSelected: TonSelectedChange;
  primary?: Tprimary;
  loading?: Tloading;
};

export const mockPresentationprops = (): TpresentationProps => {
  const mockUniqueOption = (value, index) => {
    const option = mockOption();

    return {
      ...option,
      value: `${index}-${option.value}`,
    };
  };

  const options = createRandomLengthArray(1, 30, mockUniqueOption) as Toption[];

  return {
    options,
    selected: faker.random.arrayElement(options).value,
    changeSelected: mockOnSelectedChange(),
    primary: mockPrimary(),
    loading: mockLoading(),
  };
};

// Type: Tprops
/**
 * All props accepted by the `<FilterDropdown />` component.
 *
 * Note that if `options` is an empty array or `null` then an array will
 * automatically be created that only has the `selected` value in it. Therefore
 * automatically setting the button to disabled, since there are not other
 * options to toggle between.
 */
export type Tprops = {
  options: Toption[];
  initialSelected: ToptionValue;
  onSelectedChange: TonSelectedChange;
  primary?: Tprimary;
  loading?: Tloading;
};

export const mockProps = (): Tprops => {
  const mockUniqueOption = (value, index) => {
    const option = mockOption();

    return {
      ...option,
      value: `${index}-${option.value}`,
    };
  };

  const options = createRandomLengthArray(1, 30, mockUniqueOption) as Toption[];

  return {
    options,
    initialSelected: faker.random.arrayElement(options).value,
    onSelectedChange: mockOnSelectedChange(),
    primary: mockPrimary(),
    loading: mockLoading(),
  };
};
