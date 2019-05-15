import faker from 'faker';

// Type: TfilterOnChange
/**
 * This is a function that fires when the year is selected from
 * the drop down. The year that is clicked on will be passed
 * as an argument to the function.
 */
export type TfilterOnChange = (Toption) => void | null;
export const mockFilterOnChange = (): TfilterOnChange => console.log;

// Type: Tfilterloading
/**
 * This value is true when there is no options to show the user yet (the data is
 * still loading asynchronously). If loading is true, the drop down should be
 * disabled. Furthermore, if `TfilterObject` has a `selected` value, then a
 * spinner should be attached after the selected value but if no `selected`
 * value is present, then the spinner will just be where the `selected` value
 * would have been. Note that even if `onChange` exists, it cannot be fired
 * until `loading` is set to false.
 */
export type Tfilterloading = boolean;
export const mockFilterLoading = (): Tfilterloading => faker.random.boolean();

// Type: Toption
/**
 * This is the year for the FocusArea. year e.g:
 * '2019-20'. This usually corresponds to the data that
 * is passed to the chart and changing this will update the data that is passed
 * to the chart.
 */
export type Toption = string;

// Type: TfilterObject
/**
 * This is an object that has all the values and behavior needed for either the
 * years or phases drop down filter. If null, then dropdown filter will not
 * appear. If, `selected` is present but neither `options` nor `onChange`, then
 * the drop down is disabled (and therefore a user cannot change a selected
 * value).
 */
export type TfilterObject = {
  options: Toption[];
  selected: Toption;
  loading: Tfilterloading;
  onChange: TfilterOnChange;
};

export const mockFilterObject = (createOptionCallback): TfilterObject => {
  const options = [1, 2, 3, 4, 5, 6].map((): Toption => createOptionCallback());

  return {
    options,
    selected: faker.random.arrayElement(options),
    loading: mockFilterLoading(),
    onChange: mockFilterOnChange(),
  };
};

// Type: Tprops
/**
 * React props accepted by `<FocusArea />` view.
 */
export type Tprops = {
  focusAreas: TfilterObject;
  years: TfilterObject;
};

export const mockYearsProp = (): TfilterObject =>
  mockFilterObject(() => faker.random.number({ min: 1950, max: 2015 }).toString());
export const mockFocusAreasProp = () => mockFilterObject(faker.commerce.department);

export const mockProps = (): Tprops => ({
  focusAreas: mockFocusAreasProp(),
  years: mockYearsProp(),
});

// Type: TfocusAreaName
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TfocusAreaName = string;

// Type: TfocusAreaAmount
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TfocusAreaAmount = number;

// Type: TfocusAreaUrl
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TfocusAreaUrl = string;

// Type: TfocusAreaId
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TfocusAreaId = string;

// Type: TchartItemObject
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TchartItemObject = {
  id: TfocusAreaId;
  name: TfocusAreaName;
  amount: TfocusAreaAmount;
  url: TfocusAreaUrl;
};

// Type: TchartParentItemObject
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TchartParentItemObject = TchartItemObject & { children: TchartItemObject[] };

// Type: Tfootnote
/**
 * TODO: Zeeshaaan add description and mock
 */
export type Tfootnote = string;

// Type: Tnotice
/**
 * TODO: Zeeshaaan add description and mock
 */
export type Tnotice = string;

// Type: Ttotal
/**
 * TODO: Zeeshaaan add description and mock
 */
export type Ttotal = number;

// Type: TchartMetaInfo
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TchartMetaInfo = {
  notices?: Tnotice[];
  footnotes?: Tfootnote[];
  total: Ttotal;
};

// Type: TnationalChartInfo
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TnationalChartInfo = TchartMetaInfo & { departments: TchartItemObject[] };

// Type: TprovincialChartInfo
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TprovincialChartInfo = TchartMetaInfo & { provinces: TchartParentItemObject[] | null };

// Type: Tstate
/**
 * React state of the `<FocusArea />` view
 */
export type Tstate = {
  selectedFocusArea: Toption;
  selectedYear: Toption;
  nationalChartData: TnationalChartInfo;
  provincialChartData: TprovincialChartInfo;
};
