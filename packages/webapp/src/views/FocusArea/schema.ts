import faker from 'faker';
import { TitemPreview } from '../../components/ChartSection/schema';

export type TnationalSelected = TitemPreview;
export type TprovincialSelected = TitemPreview;

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

// Type: TchartItemName
/**
 * TODO: Zeeshaaan add description
 */
export type TchartItemName = string;
export const chartItemName = (): TchartItemName => faker.commerce.department();

// Type: TchartItemAmount
/**
 * TODO: Zeeshaaan add description
 */
export type TchartItemAmount = number;
export const chartItemAmount = (): TchartItemAmount =>
  faker.commerce.amount({ min: 100000000, max: 999999999 });

// Type: TchartItemUrl
/**
 * TODO: Zeeshaaan add description
 */
export type TchartItemUrl = string;
export const chartItemUrl = (): TchartItemUrl => faker.internet.url();

// Type: TchartItemId
/**
 * TODO: Zeeshaaan add description
 */
export type TchartItemId = string;
export const chartItemId = (): TchartItemId => faker.random.uuid();

// Type: TchartItemObject
/**
 * TODO: Zeeshaaan add description
 */
export type TchartItemObject = {
  id: TchartItemId;
  name: TchartItemName;
  amount: TchartItemAmount;
  url: TchartItemUrl | null;
};

export const mockChartItemObject = (): TchartItemObject => ({
  id: chartItemId(),
  name: chartItemName(),
  amount: chartItemAmount(),
  url: faker.random.boolean() ? chartItemUrl() : null,
});

// Type: TchartParentItemObject
/**
 * TODO: Zeeshaaan add description
 */
export type TchartParentItemObject = TchartItemObject & { children: TchartItemObject[] };

export const mockChartParentItemObject = (): TchartParentItemObject => ({
  ...mockChartItemObject(),
  children: [1, 2, 3, 4, 5].map(mockChartItemObject),
});

// Type: Tfootnote
/**
 * TODO: Zeeshaaan add description
 */
export type Tfootnote = string;
export const mockFootnote = (): Tfootnote => faker.random.phrase();

// Type: Tnotice
/**
 * TODO: Zeeshaaan add description
 */
export type Tnotice = string;
export const mockNotice = (): Tnotice => faker.random.phrase();

// Type: Ttotal
/**
 * TODO: Zeeshaaan add description
 */
export type Ttotal = number;
export const mockTotal = (): Ttotal => faker.commerce.amount({ min: 100000000, max: 999999999 });

// Type: TchartMetaInfo
/**
 * TODO: Zeeshaaan add description
 */
export type TchartMetaInfo = {
  notices?: Tnotice[];
  footnotes?: Tfootnote[];
  total: Ttotal;
};

export const mockChartMetaInfo = (): TchartMetaInfo => ({
  notices: faker.random.boolean() ? [1, 2, 3, 4].map(mockNotice) : null,
  footnotes: faker.random.boolean() ? [1, 2, 3, 4].map(mockFootnote) : null,
  total: mockTotal(),
});

// Type: TnationalChartInfo
/**
 * TODO: Zeeshaaan add description
 */
export type TnationalChartInfo = TchartMetaInfo & { departments: TchartItemObject[] };

export const mockNationalChartInfo = (): TnationalChartInfo => ({
  ...mockChartMetaInfo(),
  departments: [1, 2, 3, 4, 5].map(mockChartItemObject),
});

// Type: TprovincialChartInfo
/**
 * TODO: Zeeshaaan add description
 */
export type TprovincialChartInfo = TchartMetaInfo & { provinces: TchartParentItemObject[] | null };

export const mockProvincialChartInfo = (): TprovincialChartInfo => ({
  ...mockChartMetaInfo(),
  provinces: [1, 2, 3, 4, 5].map(mockChartParentItemObject),
});

// Type: Tprops
/**
 *  React props accepted by `<FocusArea />`.
 */
export type Tprops = {
  focusAreas: TfilterObject;
  years: TfilterObject;
  nationalChartData: TnationalChartInfo;
  provincialChartData: TprovincialChartInfo;
};

export const mockYearsProp = (): TfilterObject =>
  mockFilterObject(() => faker.random.number({ min: 1950, max: 2015 }).toString());
export const mockFocusAreasProp = () => mockFilterObject(faker.commerce.department);

const nationalChart = mockNationalChartInfo();
const provinceChart = mockProvincialChartInfo();

export const mockProps = (): Tprops => ({
  focusAreas: mockFocusAreasProp(),
  years: mockYearsProp(),
  nationalChartData: mockNationalChartInfo(),
  provincialChartData: mockProvincialChartInfo(),
});

// Type: TdataError
/**
 * TODO: Zeeshaan add description
 */
export type TdataError = boolean;
export const mockDataError = () => faker.random.boolean();

// Type: Terrors
/**
 * TODO: Zeeshaan add description
 */
export type Terrors = {
  data: TdataError | false;
};

export const mockErrors = () => ({
  data: mockDataError(),
});

// Type: Tstate
/**
 * TODO: Zeeshaaan add description
 */
export type Tstate = {
  selectedFocusArea: TfilterObject;
  selectedYear: TfilterObject;
  nationalSelected: TnationalSelected;
  provincialSelected: TprovincialSelected;
  errors: Terrors;
};
