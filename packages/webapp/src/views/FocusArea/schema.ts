import faker from 'faker';

// Type: TfilterOnChange
/**
 * TODO: Zeeshaaan add description and mock
 */
export type TfilterOnChange = (Toption) => void | null;
export const mockFilterOnChange = (): TfilterOnChange => console.log;

// Type: Tfilterloading
/**
 * TODO: Zeeshaaan add description and mock
 */
export type Tfilterloading = boolean;
export const mockFilterLoading = (): Tfilterloading => faker.random.boolean();

// Type: Toption
/**
 * TODO: Zeeshaaan add description and mock
 */
export type Toption = string;

// Type: TfilterObject
/**
 * TODO: Zeeshaaan add description and mock
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
 * TODO: Zeeshaaan add description and mock
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
 * TODO: Zeeshaaan add description and mock
 */
export type Tstate = {
  selectedFocusArea: Toption;
  selectedYear: Toption;
  nationalChartData: TnationalChartInfo;
  provincialChartData: TprovincialChartInfo;
};
