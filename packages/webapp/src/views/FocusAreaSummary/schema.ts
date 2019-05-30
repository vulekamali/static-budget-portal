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
  TpreviewValue as TchartTotalAmount,
  Tnotice as TchartNoticeItem,
  mockLoading as mockChartLoading,
  mockPreviewValue as mockTotalAmount,
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
export const mockFooterItem = () => faker.hacker.phrase();

// Type: TnationalTreemap
/**
 * This is the data needed to render the national treemap chart on the focus area summary pages.
 */
export type TnationalTreemap = {
  chartLoading: TchartLoading;
  chartData: TchartItem[];
  chartTotalAmount: TchartTotalAmount;
  chartFooterData: TfooterItem[];
};

export const mockNationalTreemap = () => ({
  chartLoading: mockChartLoading(),
  chartData: createRandomLengthArray(0, 10, mockChartItem),
  chartTotalAmount: mockTotalAmount(),
  chartFooterData: createRandomLengthArray(0, 3, mockFooterItem),
});

// Type: TprovincialTreemap
/**
 * This is the data needed to render the provincial treemap chart on the focus area summary pages.
 */
export type TprovincialTreemap = TnationalTreemap & {
  chartData: TnestedChartItem[];
  chartNoticesData: TchartNoticeItem[];
};

export const mockProvincialTreemap = () => ({
  chartData: createRandomLengthArray(0, 10, mockNestedChartItem),
  chartNoticesData: createRandomLengthArray(0, 3, mockNoticeItem),
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

export const mockPresentationalProps = () => ({
  heading: mockHeading(),
  national: mockNationalTreemap(),
  provincial: mockProvincialTreemap(),
});

// Type: TpresentationProps
/**
 *  The view component that render the summary page for consolidated budget focus areas.
 */
export type Tprops = TpresentationProps;
export const mockProps = mockPresentationalProps;
