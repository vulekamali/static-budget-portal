import { Tprops as Theading } from '../../components/ContentFilterHeading/schema';

import {
  TbaseItem as TchartItem,
  TparentItem as TnestedChartItem,
} from '../../components/BarChart/schema';

import {
  Tloading as TchartLoading,
  TitemPreview as TintialSelected,
  Tnotice as TchartNoticeItem,
} from '../../components/ChartSection/schema';

// Type: Tfooter
/**
 * This is a single line of fineprint/disclaimer text that goes under the chart. It should be used
 * to indicate any caveats or contexts that the user should keep in mind.
 */
export type TfooterItem = string;

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

// Type: Ttotal
/**
 * TODO: description
 */
export type Ttotal = number;

// Type: Tpercentage
/**
 * TODO: description
 */
export type Tpercentage = number;

// Type: Tdescription
/**
 * TODO: description
 */
export type Tdescription = string;

// Type: Tintroduction
/**
 * TODO: description
 */
export type Tintroduction = {
  total: Ttotal;
  description?: Tdescription | null;
  percentage: Tpercentage;
  sphere: Tsphere;
};

// Type: Terror
/**
 * If true then UI will alert the user to the fact that something happened and propmpt them to
 * contact support if the issue persists.
 */
export type Terror = boolean;

// Type: TpresentationProps
/**
 *  All props accepted by the `<Presentation />` sub-component inside `<DepartmentSummary />`
 *  component.
 */
export type TpresentationProps = {
  error: Terror;
  heading: Theading;
  introduction: Tintroduction;
  programmes: Tprogrammes;
  relatedFocusAreas: TfocusArea[];
};

// Type: TfinancialYear
/**
 * A single financial year associated with either a national or provincial budget. For example:
 * '2017-18' or '2019-20'.
 */
export type TfinancialYear = string;

// Type: TlatestYear
/**
 * The current financial year that we are in.
 */
export type TlatestYear = TfinancialYear;

// Type: startingSelectedYear
/**
 * The selected year that should be used when the view first mounts. This is usually derived from
 * the URL route.
 */
export type TstartingSelectedYear = string;

// Type: TstartingSelectedFocusArea
/**
 * The selected focus area that should be used when the view first mounts. This is usually derived
 * from the URL route.
 */
export type TstartingSelectedFocusArea = string;

// Type: TfocusArea
/**
 * A single focus area associated with the consolidated budget.
 */
export type TfocusArea = string;

// Type: TyearAndFocusAreaObject
/**
 * A set of props passed to `TchangeUrl` and `TgetValidYears`.
 */
export type TyearAndFocusAreaObject = {
  year: TfinancialYear;
  focusArea: TfocusArea;
};

// Type: TchangeUrl
/**
 * A callback that fires outside of the component each time a URL change of the should be triggered.
 */
export type TonUrlChange = (TyearAndFocusAreaObject) => void;

// Type: TgetValidYears
/**
 * A function returned by `TconstructGetValidYearsFnProps` used to fetch the data required to
 * calculate what years are valid for a specific focus area.
 */
export type TgetValidYears = (TyearAndFocusAreaObject) => void;

// Type: TisValidYear
/**
 * Whether a specific focus area is present in a year or whether information for that year is
 * available at all.
 */
export type TisValidYear = boolean;

// Type: TisValidYearsList
/**
 * A list of `TisValidYear` items. Used enable toggling to a specific year in the year dropdown.
 */
export type TisValidYearsList = [TisValidYear, TisValidYear, TisValidYear, TisValidYear];

// Type: TsetValidYearsState
/**
 * Sets the valid years state in the component.
 */
export type TsetValidYearsState = (TisValidYearsList) => void;

// Type: TsetValidYearsState
/**
 * Sets the valid years state in the component.
 */
export type TsetErrorState = (Terror) => void;

// Type: Tloading
/**
 * Whether a piece of data is still in the process of being fetched from the back-end API.
 */
export type Tloading = boolean;

// Type: TsetLoading
/**
 * Sets the state for whether a specific piece of data is currently being fetched from the back-end API yet.
 */
export type TsetLoading = (Tloading) => void;

// Type: TconstructGetValidYearsFnProps
/**
 * The props accepted by `TconstructGetValidYearsFn`.
 */
export type TconstructGetValidYearsFnProps = {
  setValidYears: TsetValidYearsState;
  setValidYearsLoading: TsetLoading;
  setError: TsetErrorState;
  latestYear: TlatestYear;
};

// Type: TconstructGetValidYearsFn
/**
 * A function that creates `TgetValidYears` through currying. Is passed from outside the component.
 */
export type TconstructGetValidYearsFn = (TconstructGetValidYearsFnProps) => TgetValidYears;

// Type: TgetDepartmentsDataProps
/**
 * Props accepted by `TgetDepartmentsData`.
 */
export type TgetDepartmentsDataProps = {
  year: TfinancialYear;
};

// Type: TgetDepartmentsData
/**
 * A function call that returns all the data required to render a focus area for a specific `TfinancialYear`.
 */
export type TgetDepartmentsData = (TgetDepartmentsDataProps) => void;

// Type: TconstructGetFocusAreaDataProps
/**
 * Props accepted by `TconstructGetFocusAreaData`.
 */
export type TconstructGetFocusAreaDataProps = {
  setDepartmentsData: TsetErrorState;
  setDepartmentsDataLoading: TsetLoading;
  setError: TsetErrorState;
};

// Type: TconstructGetFocusAreaData
/**
 * A function that creates `TgetValidYears` through currying. Is passed from outside the component.
 */
export type TconstructGetFocusAreaData = (TconstructGetFocusAreaDataProps) => TgetFocusAreaData;

// Type: Tprops
/**
 * The view component that render the summary page for consolidated budget focus areas.
 */
export type Tprops = {
  latestYear: TlatestYear;
  startingSelectedYear: TstartingSelectedYear;
  startingSelectedFocusArea: TstartingSelectedFocusArea;
  onUrlChange: TonUrlChange;
  constructGetDepartmentsData: TconstructGetFocusAreaData;
  constructGetValidYearsFn: TconstructGetValidYearsFn;
};
