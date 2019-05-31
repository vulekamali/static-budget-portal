import faker from 'faker';

import {
  Tprops as Theading,
  mockDropdown,
  Tprops as TpropsView,
  mockProps as mockPropsView,
} from '../../components/ContentFilterHeading/schema';

import {
  TitemBase as TchartItem,
  mockItemBase as mockChartItem,
} from '../../components/BarChart/schema';

import {
  Tloading as TchartLoading,
  TpreviewValue as TchartTotalAmount,
  Tnotice as TchartNoticeItem,
  mockLoading as mockChartLoading,
  mockPreviewValue as mockTotalAmount,
  mockNotice as mockNoticeItem,
} from '../../components/ChartSection/schema';

import { Subtract } from 'utility-types';
import { omit } from 'lodash';

export { mockDropdown };

export type HeadingProps = { title?: string; button?: string };
export type Theading = Subtract<TpropsView, HeadingProps>;
export const mockHeading = () => omit(mockPropsView(), ['title', 'button']);

const createRandomLengthArray = (min, max, callback) =>
  new Array(faker.random.number({ min, max })).fill(true).map(callback);

// Type: Tfooter
/**
 * This is a single line of fineprint/disclaimer text that goes under the chart. It should be used
 * to indicate any caveats or contexts that the user should keep in mind.
 */
export type TfooterItem = string;
export const mockFooterItem = (): TfooterItem => faker.hacker.phrase();

// Type: Tprogrammes
/**
 * This is the data needed to render the bar chart on the deparment summary pages.
 */
export type Tprogrammes = {
  chartLoading: TchartLoading;
  chartData: TchartItem[];
  chartTotalAmount: TchartTotalAmount;
  chartFooterData: TfooterItem[];
  chartNoticeData: TchartNoticeItem[];
};

export const mockProgrammes = (): Tprogrammes => ({
  chartLoading: mockChartLoading(),
  chartData: createRandomLengthArray(1, 10, mockChartItem) as TchartItem[],
  chartTotalAmount: mockTotalAmount(),
  chartFooterData: createRandomLengthArray(0, 3, mockFooterItem) as TfooterItem[],
  chartNoticeData: createRandomLengthArray(0, 3, mockNoticeItem) as TchartNoticeItem[],
});

// Type: Ttotal
/**
 *
 */
export type Ttotal = number;
export const mockTotal = (): Ttotal => faker.random.number({ min: 100000000, max: 900000000 });

// Type: Tsphere
/**
 *
 */
export type Tsphere = string;
export const mockSphere = (): Tsphere => faker.commerce.department();

// Type: Tpercentage
/**
 *
 */
export type Tpercentage = number;
export const mockPercentage = (): Tpercentage => faker.random.number({ min: 0, max: 100 });

// Type: Tdescription
/**
 *
 */
export type Tdescription = string;
export const mockDescription = (): Tdescription => faker.lorem.paragraphs(3);

// Type: Tintroduction
/**
 *
 */
export type Tintroduction = {
  total: Ttotal;
  description?: Tdescription | null;
  percentage: Tpercentage;
  sphere: Tsphere;
};

export const mockIntroduction = (): Tintroduction => ({
  total: mockTotal(),
  description: mockDescription(),
  percentage: mockPercentage(),
  sphere: mockSphere(),
});

// Type: TfocusAreaSlug
/**
 *
 */
export type TfocusAreaSlug = string;
export const mockFocusAreaSlug = (): TfocusAreaSlug => faker.random.uuid();

// Type: TfocusAreaTitle
/**
 *
 */
export type TfocusAreaTitle = string;
const mockFocusAreaTitle = (): TfocusAreaTitle => faker.commerce.productName();

// Type: TfocusAreaUrl
/**
 *
 */
export type TfocusAreaUrl = string;
export const mockFocusAreaUrl = (): TfocusAreaUrl => faker.internet.url();

// Type: TfocusArea
/**
 *
 */
export type TfocusArea = {
  slug;
  title;
  url;
};

export const mockFocusArea = (): TfocusArea => ({
  slug: mockFocusAreaSlug(),
  title: mockFocusAreaTitle(),
  url: mockFocusAreaUrl(),
});

// Type: TpresentationProps
/**
 *  All props accepted by the `<Presentation />` sub-component inside
 *  `<DepartmentSummary />` component.
 */
export type TpresentationProps = {
  heading: Theading;
  introduction: Tintroduction;
  programmes: Tprogrammes;
  relatedFocusAreas: TfocusArea[];
};

export const mockPresentationalProps = (): TpresentationProps => ({
  heading: mockHeading(),
  introduction: mockIntroduction(),
  programmes: mockProgrammes(),
  relatedFocusAreas: createRandomLengthArray(0, 10, mockFocusArea) as TfocusArea[],
});

// Type: TpresentationProps
/**
 *  The view component that render the summary page for consolidated budget focus areas.
 */
export type Tprops = TpresentationProps;
export const mockProps = mockPresentationalProps;
