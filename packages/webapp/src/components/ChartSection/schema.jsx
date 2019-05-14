import React, { Fragment } from 'react';
import faker from 'faker';

// Type: TpreviewName
/**
 * Displays the name associated with a specific chart item (Note that if, zoom is present, that zoom will be prefixed to this name).
 */
// export type TpreviewName = string;
const mockPreviewName = () => faker.commerce.productName();

// Type: Type: TpreviewColor
/**
 * Determines the color of the button associated with a specific chart item.
 */
// export type TpreviewColor = string;
const mockPreviewColor = () => faker.internet.color();

// Type: Type: TpreviewValue
/**
 * This is a specific value associated with a specific chart item (or a default state if no item is selected). Keep in mind that an 'R' (Rand) will be prefixed to the value. If the value is higher than a million or a billion, etc, it will show as an amount of million or billion. 
 */
// export type TpreviewValue = number;
const mockPreviewValue = () => faker.finance.amount(100000000, 999999999);

// Type: Type: TpreviewUrl
/**
 * takes a url that navigates to a page associated with a specific chart item. If value is null, then button will be greyed out (disabled).
 */
// export type TpreviewUrl = string;
const mockPreviewUrl = () => faker.internet.url();

// Type: TpreviewZoom
/**
 * This value is only used when working with charts with multiple
 * levels. If value is null, then the chart defaults to the broadest possible view. However, if an id is passed, then the chart focuses in on the specific part that coincides with that id. In terms of this component, the zoom is usually prefixed infront of the preview name when present.
 */
// export type TpreviewZoom = String;
const mockPreviewZoom = () => faker.commerce.department();

// Type: TitemPreview
/**
 * This is an object that contains all the information needed to render the preview of a specific item in the chart. It usually updates when an item is selected. It usually also falls back to a preset of object of values. If null, then no itemPreview will be shown in the chart wrapper.
 */
// export type TitemPreview = {name: TpreviewName; color: TpreviewColor;
//   value: TpreviewValue; url: TpreviewUrl | null; zoom: TpreviewZoom | null;
// }
export const mockItemPreview = () => ({
  name: mockPreviewName(),
  color: mockPreviewColor(),
  value: mockPreviewValue(),
  url: faker.random.boolean() ? mockPreviewUrl() : null,
  zoom: faker.random.boolean() ? mockPreviewZoom() : null,
});

// Type: Toption
/**
 * This is either the year or budget phase for the ChartSection. year e.g:
 * '2019-20'. phase e.g: 'original'. This usually corresponds to the data that is passed to the chart and changing this will update the data that is passed to the chart.
 */
// export type Toption = string;


// Type: TselectObjectCallback
/**
 * This is a function that fires when either the year or phase is selected from a drop down. The name of the phase or year that is clicked on will be passed as an argument to the function.
 */
// export type TselectObjectCallback = (Toption) => void | null;
export const mockSelectObjectCallback = () => value => console.log(value);

// Type: TSelectLoading
/**
 * This value is usually set to true when the data regarding what options are available is not loaded yet. If this is true, then the drop down should be disabled. If no selected value in that object is passed, then Spinner will show instead of the value. However if selected is passed, then spinner will be added after the value. Note that even if onChange exists, it cannot be fired until loading is set to false.
 */

// export type TSelectLoading = boolean;
export const mockSelectLoading = () => faker.random.boolean();

// Type: TselectObject
/**
 * This is an object that has all the values and behavior needed for either the years or phases drop down filter. If null, then dropdown filter will not appear. If, `selected` is present but neither `options` nor `onChange`, then the drop down is disabled (and therefore a user cannot change a selected value).
 */
// export type TselectObject = {
//   options: Toption[];
//   selected: Toption;
//   onChange: TselectObjectCallback;
//   loading?: boolean;
// }
export const mockSelectObject = (createOptionCallback) => {
  const options = [1,2,3,4,5].map(createOptionCallback);

  return {
    options,
    selected: faker.random.arrayElement(options),
    onChange: mockSelectObjectCallback(),
    loading: mockSelectLoading(),
  }
};

// Type: Tloading
/**
 * This reflects the state of the ChartSection. E.g when `loading` is
 * true, show chart, otherwise, show loading state of the ChartSection, i.e
 * Greyed out Chart and Spinner.
 */
// export type Tloading = Boolean;
export const mockLoading = () => faker.random.boolean();

// Type: Tverb
/**
 * The text inside of the button above the chart is divided into a subject and
 * verb. This is for the verb part. E.g: 'Explore'
 */
// export type Tverb = string;
export const mockVerb = () => faker.hacker.verb();

// Type: Tsubject
/**
 * The text inside of the button above the chart is divided into a subject and
 * verb. This is for the subject part. E.g: 'this department'. Note, the subject
 * gets hidden on mobile.
 */
// export type Tsubject = string;
export const mockSubject = () => faker.hacker.noun();

// Type: Ttitle
/**
 * This is the main text at the top of the ChartSection and will probably not
 * change after the component renders. It should display what the ChartSection
 * represents. Eg: Consolidated Budget Summary
 */
// export type Ttitle = string;
export const mockTitle = () => faker.commerce.productName();

// Type: Tanchor
/** TODO: Check how 'share' works It is an anchor that is attached to the page
 * url when sharing this chart. Make sure that the component is wrapped in a div
 * that has an id that is the same as this value. (so that users immediately
 * scroll down to the chart when clicking on a shared link). If anchor is null,
 * then the sharing icon will not be available. If anchor is passed simply as a
 * boolean, i.e true, then the sharing icon will share the entire page url.
 */
// export type Tanchor = string;
export const mockAnchor = () => faker.commerce.department();

// Type: Tfooter
/**
 * This is the fineprint/disclaimer text that goes under the chart. It should be
 * used to indicate any caveats or contexts that the user should keep in mind.
 */
// export type Tfooter = string | JSX.Element;
export const createFooterComponent = () => <Fragment>{[1,2,3].map(() => <p>{faker.hacker.phrase()}</p>)}</Fragment>
export const createFooterString = () => faker.hacker.phrase();
export const mockFooter = () => faker.random.boolean() ? createFooterString() : createFooterComponent();

// Type: TonPreviewChange
/**
 * This is the function that is passed via `TchartCallback` into a chart if
 * needed. It takes an object in the shape of `TitemPreview` and sets the object
 * as the value of `itemPreview` in the state.
 */
// export type TonPreviewChange = (TitemPreview) => void | null;
export const mockOnPreviewChange = () => console.log;

// Type: TchartCallback
/**
 * Callback function that renders the actual chart (for e.g: `<Treemap />`,
 * `<Barchart />`, `<StackChart />`). This function uses currying in order to
 * pass the `TonPreviewChange` function to any of the above charts (used as
 * render prop).
 */
// export type TchartCallback = (TonPreviewChange) => JSX.Element;
export const mockChartCallback = () => () => <div>Hello World!</div>


// Type: TselectObject
/**
 * React props accepted by `<ChartSection />`.
 */


// export type Tprops = {
//   loading: Tloading,
//   verb: Tverb,
//   subject: Tsubject,
//   title: Ttitle,
//   years?: TselectObject,
//   phases?: TselectObject;
//   itemPreview: TitemPreview;
//   anchor?: string | true;
//   footer?: Tfooter;
//   chart: TchartCallback;
// }
export const mockYearsProp = () => mockSelectObject(() => {
  const year = faker.random.number(1990, 2015);
  const nextYear = (year + 1).toString().substr(-2);
  return `${year}-${nextYear}`;
});
export const mockPhasesProp = () => mockSelectObject(() => faker.hacker.noun());

export const mockAnchorProp = () => {
  const selected = faker.random.arrayElement(['1','2','3']);

  switch (selected) {
    case '1': return mockAnchor();
    case '2': return false;
    case '3': return null;
    default: return null;
  }
}

export const mockProps = () => ({
  loading: mockLoading(),
  verb: mockVerb(),
  subject: mockSubject(),
  title: mockTitle(),
  years: faker.random.boolean() ? mockYearsProp() : null,
  phases: faker.random.boolean() ? mockPhasesProp() : null,
  itemPreview: mockItemPreview(),
  anchor: mockAnchorProp(),
  footer: faker.random.boolean() ? mockFooter() : null,
  chart: mockChartCallback(),
})