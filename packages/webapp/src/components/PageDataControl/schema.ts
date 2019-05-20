/**
 * This component wraps an entire page's content. It includes the markup that shows all the filters that can be applied on the data and also the logic that fetches the new data from a remote api. Currently this component only support changing years and selected items (for e.g, forcus area or department). As these are changed, it is reflected in the markup of this component. However, once the data is returned from the server that corresponds to the applied filters, it is passed down to the components filter (the page) via a render prop (https://reactjs.org/docs/render-props.html). Lastly, in order to account for differences in user routes and location of data, this component accepts `urlCallback` and `apiCallback`, that respectively returns a route and enpoint string based on the selected filters.
 */

/**
 * The text to show in the detailed button.
 */

// Type: TbuttonText
export type TbuttonText = string;

/** This is the where to go when the button is clicked */

// Type: TbuttonUrl
export type TbuttonUrl = string;

/**
 * The callback that takes the filters and convert them to the data needed for a button.If the callback is not provided, a button will never be shown.
 */

// Type: TcreateButton
export type TcreateButton = (TcreateUrlProps) => Tbutton;

/** Everything needed to render the button. */

// Type: Tbutton
export type Tbutton = {
  text: TbuttonText;
  url: TbuttonUrl;
};

/**
 * The main text in the heading. If not supplied, then no heading is added.
 */

// Type: TpageTitle
export type TpageTitle = string;

/**
 * Slug associated with this specific filter option.
 */

// Type: ToptionSlug
export type ToptionSlug = string;

/** While filterLoading is true, user cannot toggle between filterOptions. UI will also show a Spinner in the dropdown */

// Type: Tfilterloading
export type Tfilterloading = boolean;

/**
 * The text that shows in the drop down.
 */

// Type: ToptionText
export type ToptionText = string;

/** Whether a user can select a specific option from the drop down. */

// Type: ToptionDisabled
export type ToptionDisabled = boolean;

/**All the information required to render a  single option in a dropdown. */

// Type: ToptionObject
export type ToptionObject = {
  id: ToptionSlug;
  text: ToptionText;
  disabled: ToptionDisabled;
};

/**All the information required to create an entire filter dropdown. */

// Type: TfilterObject
export type TfilterObject = {
  options: ToptionObject[];
  selected: ToptionSlug;
  loading: Tfilterloading;
};

/** The response from the api call. This is automatically passed to the render prop */

// Type: TpageData
export type TpageData = any;

/** This is the render prop that renders the content wrapped by this `<DataPageControl></DataPageControl>` component */
// Type: Tchildren
export type Tchildren = (TpageData) => JSX.Element;

/** The props used in all callbacks that fire when the filters are updated. */

// Type: TcreateUrlProps
export type TcreateUrlProps = {
  year: ToptionSlug;
  selection: ToptionSlug;
};

/** This takes the filter values and create a `url` to display the user in the browser. */

// Type: TcreateBrowserUrl
export type TcreateBrowserUrl = (TcreateUrlProps) => void | null;

/** This takes the filter values and determines what endpoints to use to load new page data. */

// Type: TcreateDataApiUrl
export type TcreateDataApiUrl = (TcreateUrlProps) => void | null;

// Type: Tprops
export type Tprops = {
  title: TpageTitle;
  urlCallback: TcreateBrowserUrl;
  apiCallback: TcreateDataApiUrl;
  children: Tchildren;
};

//Type: Tstate
export type Tstate = {
  selectionFilter: TfilterObject;
  yearFilter: TfilterObject;
  button: Tbutton;
  pageData: TpageData;
};
