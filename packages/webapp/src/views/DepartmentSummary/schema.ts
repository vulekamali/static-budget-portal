import faker from 'faker';

import {
  Tprops as Theading,
  mockDropdown,
  Tprops as TpropsView,
  mockProps as mockPropsView,
  Tbutton,
  mockButton as mockButtonDepartment,
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

export { mockDropdown, mockButtonDepartment };

export type HeadingProps = { title?: string; button?: Tbutton };
export type Theading = Subtract<TpropsView, HeadingProps>;
export const mockHeading = () => omit(mockPropsView(), ['title', 'button']);

const conditionalValue = callback => (faker.random.boolean() ? callback() : null);

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
// export type Tsphere = string;
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
  description: conditionalValue(mockDescription),
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
  button: Tbutton;
};

export const mockPresentationalProps = (): TpresentationProps => ({
  heading: mockHeading(),
  introduction: mockIntroduction(),
  programmes: mockProgrammes(),
  relatedFocusAreas: createRandomLengthArray(0, 10, mockFocusArea) as TfocusArea[],
  button: mockButtonDepartment(),
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
  faker.random.arrayElement(testYears.filter(year => year !== '2017-18'));

// Type: startingSelectedYear
/**
 *
 */
export type TstartingSelectedFocusArea = string;

const testFocusAreas = [
  'Cooperative Governance and Traditional Affairs',
  'Communications',
  'Basic Education",Agriculture',
  'Forestry and Fisheries',
];

export const mockStartingSelectedFocusArea = (): TstartingSelectedFocusArea =>
  faker.random.arrayElement(testFocusAreas);

// Type: TchangeUrl
/**
 *
 */
export type TonUrlChange = (string) => void;
const mockOnUrlChange = () => value => console.log(value);

// Type: Tgovernment
/**
 *
 */
export type Tgovernment = '';

// Type: Tsphere
/**
 *
 */
export type Tsphere = '';

// Type: Tprops
/**
 * The view component that render the summary page for consolidated budget focus areas.
 */
export type Tprops = TpresentationProps & {
  latestYear: TlatestYear;
  startingSelectedYear: TstartingSelectedYear;
  startingSelectedFocusArea: TstartingSelectedFocusArea;
  onUrlChange: TonUrlChange;
  government: Tgovernment;
  sphere: Tsphere;
};

export const mockProps = (): Tprops => ({
  ...mockPresentationalProps(),
  latestYear: mockLatestYear(),
  startingSelectedYear: mockStartingSelectedYear(),
  startingSelectedFocusArea: mockStartingSelectedFocusArea(),
  onUrlChange: mockOnUrlChange(),
});
