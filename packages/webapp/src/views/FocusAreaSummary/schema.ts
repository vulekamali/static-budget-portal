import faker from 'faker';

import {
  Tprops as Theading,
  mockProps as mockHeading,
} from '../../components/ContentFilterHeading/schema';

import {
  TbaseItem as TchartItem,
  TparentItem as TnestedChartItem,
  mockBaseItem as mockChartItem,
  mockParentItem as mockNestedChartItem,
} from '../../components/Treemap/schema';

import {
  Tloading as TchartLoading,
  TitemPreview as TintialSelected,
  Tnotice as TchartNoticeItem,
  mockLoading as mockChartLoading,
  mockItemPreview as mockInitialSelected,
  mockNotice as mockNoticeItem,
} from '../../components/ChartSection/schema';

const createRandomLengthArray = (min, max, callback) =>
  new Array(faker.random.number({ min, max })).fill(true).map(callback);

const conditionalValue = callback => (faker.random.boolean() ? callback() : null);

// Type: Tfooter
/**
 * This is a single line of fineprint/disclaimer text that goes under the chart. It should be used
 * to indicate any caveats or contexts that the user should keep in mind.
 */
export type TfooterItem = string;
export const mockFooterItem = (): TfooterItem => faker.hacker.phrase();

// Type: TnationalTreemap
/**
 * This is the data needed to render the national treemap chart on the focus area summary pages.
 */
export type TnationalTreemap = {
  chartLoading: TchartLoading;
  chartData: TchartItem[];
  intialSelectedValues: TintialSelected;
  chartFooterData: TfooterItem[];
};

export const mockNationalTreemap = (): TnationalTreemap => ({
  chartLoading: mockChartLoading(),
  chartData: createRandomLengthArray(0, 10, () => mockChartItem()) as TchartItem[],
  intialSelectedValues: mockInitialSelected(),
  chartFooterData: createRandomLengthArray(0, 3, mockFooterItem) as TfooterItem[],
});

// Type: TprovincialTreemap
/**
 * This is the data needed to render the provincial treemap chart on the focus area summary pages.
 */
export type TprovincialTreemap = TnationalTreemap & {
  chartData: TnestedChartItem[];
  chartNoticesData: TchartNoticeItem[];
};

export const mockProvincialTreemap = (): TprovincialTreemap => ({
  ...mockNationalTreemap(),
  chartData: createRandomLengthArray(0, 10, mockNestedChartItem) as TnestedChartItem[],
  chartNoticesData: createRandomLengthArray(0, 3, mockNoticeItem) as TchartNoticeItem[],
});

// Type: TpresentationProps
/**
 *  All props accepted by the `<Presentation />` sub-component inside
 *  `<FocusAreaSummary />` component.
 */
export type TpresentationProps = {
  heading: Theading;
  national: TnationalTreemap;
  provincial: TprovincialTreemap;
};

export const mockPresentationalProps = (): TpresentationProps => ({
  heading: mockHeading(),
  national: mockNationalTreemap(),
  provincial: mockProvincialTreemap(),
});

// Type: TlatestYear
/**
 *
 */
export type TlatestYear = string;

const testYears = ['2019-20', '2018-19', '2017-18', '2016-17'];

export const mockLatestYear = (): TlatestYear => testYears[0];

// Type: startingSelectedYear
/**
 *
 */
export type TstartingSelectedYear = string;
export const mockStartingSelectedYear = (): TstartingSelectedYear =>
  faker.random.arrayElement(testYears);

// Type: TpresentationProps
/**
 *  The view component that render the summary page for consolidated budget focus areas.
 */
export type Tprops = TpresentationProps & {
  latestYear: TlatestYear;
  startingSelectedYear: TstartingSelectedYear;
};

export const mockProps = (): Tprops => ({
  ...mockPresentationalProps(),
  latestYear: mockLatestYear(),
  startingSelectedYear: mockStartingSelectedYear(),
});
