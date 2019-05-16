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
 * Displays the name associated with a specific chart item (Note that if, zoom
 * is present, that zoom will be prefixed to this name).
 */
export type TchartItemName = string;
export const chartItemName = (): TchartItemName => faker.commerce.department();

// Type: TchartItemAmount
/**
 * This is a specific value associated with a specific chart item (or a default
 * state if no item is selected). Keep in mind that an 'R' (Rand) will be
 * prefixed to the value. If the value is higher than a million or a billion,
 * etc, it will show as an amount of million or billion.
 */
export type TchartItemAmount = number;
export const chartItemAmount = (): TchartItemAmount =>
  parseInt(faker.finance.amount(100000000, 999999999));

// Type: TchartItemUrl
/**
 * takes a url that navigates to a page associated with a specific chart item.
 * If value is null, then button will be greyed out (disabled).
 */
export type TchartItemUrl = string;
export const chartItemUrl = (): TchartItemUrl => faker.internet.url();

// Type: TchartItemId
/**
 * A unique id associated with a specific chart item. This id can be attached as an anchor in the sharing feature.
 */
export type TchartItemId = string;
export const chartItemId = (): TchartItemId => faker.random.uuid();

// Type: TchartItemObject
/**
 * This is an object that contains all the information needed to render the
 * preview of a specific item in the chart. It usually updates when an item is
 * selected. It usually also falls back to a preset of object of values. If
 * null, then no itemPreview will be shown in the chart wrapper.
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
 * This is an array of objects that is responsible for creating all the relevant chart items that constitute of the specific treemap in question. If the array is empty, or null it will display a notice instead of a chart. The notice will be passed through the data.
 */
export type TchartParentItemObject = TchartItemObject & { children: TchartItemObject[] };

export const mockChartParentItemObject = (): TchartParentItemObject => ({
  ...mockChartItemObject(),
  children: [1, 2, 3, 4, 5].map(mockChartItemObject),
});

// Type: Tfootnote
/**
 * This is the fineprint/disclaimer text that goes under the chart. It should be
 * used to indicate any caveats or contexts that the user should keep in mind. If null, or empty, nothing will render.
 */
export type Tfootnote = string;
export const mockFootnote = (): Tfootnote => faker.hacker.phrase();

// Type: Tnotice
/**
 * This notice should appear when a specific chart is not available. It should notify the user why the chart is not showing.
 */
export type Tnotice = string;
export const mockNotice = (): Tnotice => faker.hacker.phrase();

// Type: Ttotal
/**
 * This is a specific value associated with a specific chart. It consists of the
 * total of all the chart items added together. Keep in mind that an 'R' (Rand)
 * will be prefixed to the value. If the value is higher than a million or a
 * billion, etc, it will show as an amount of million or billion.
 */
export type Ttotal = number;
export const mockTotal = (): Ttotal => parseInt(faker.finance.amount(100000000, 999999999));

// Type: TchartMetaInfo
/**
 * This is an object that contains all the meta data needed to render alongside the
 * preview of a specific chart. It usually updates when a different focus area is
 * selected.
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
 * This is an object that contains all the information needed to render the
 * preview of a national chart. It usually updates when a focus area is
 * selected.
 */
export type TnationalChartInfo = TchartMetaInfo & { departments: TchartItemObject[] };

export const mockNationalChartInfo = (): TnationalChartInfo => ({
  ...mockChartMetaInfo(),
  departments: [1, 2, 3, 4, 5].map(mockChartItemObject),
});

// Type: TprovincialChartInfo
/**
 * This is an object that contains all the information needed to render the
 * preview of a provincial chart. It usually updates when a focus area is
 * selected. If null or empty, then a notice will be shown instead.
 */
export type TprovincialChartInfo = TchartMetaInfo & { provinces: TchartParentItemObject[] | null };

export const mockProvincialChartInfo = (): TprovincialChartInfo => ({
  ...mockChartMetaInfo(),
  provinces: [1, 2, 3, 4, 5].map(mockChartParentItemObject),
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

// Type: Tprops
/**
 * React props accepted by `<FocusArea />`.
 */
export type Tprops = {
  focusAreas: TfilterObject;
  years: TfilterObject;
  nationalChartData: TnationalChartInfo;
  provincialChartData: TprovincialChartInfo;
  adaptorErrors: Terrors;
};

export const mockYearsProp = (): TfilterObject =>
  mockFilterObject(() => faker.random.number({ min: 1950, max: 2015 }).toString());
export const mockFocusAreasProp = () => mockFilterObject(faker.commerce.department);

export const mockProps = (): Tprops => ({
  focusAreas: mockFocusAreasProp(),
  years: mockYearsProp(),
  nationalChartData: mockNationalChartInfo(),
  provincialChartData: mockProvincialChartInfo(),
  adaptorErrors: mockErrors(),
});

// Type: Tstate
/**
 * All the react state inside of `<FocusArea />`.
 */
export type Tstate = {
  selectedFocusArea: TfilterObject;
  selectedYear: TfilterObject;
  nationalSelected: TnationalSelected;
  provincialSelected: TprovincialSelected;
  errors: Terrors;
};
