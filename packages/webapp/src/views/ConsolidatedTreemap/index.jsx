import React, { Fragment } from 'react';
import MediaQuery from "react-media";

import calcIfForeignObjectIsSupported from './calcIfForeignObjectIsSupported';
import ChartSection from './../../components/ChartSection';
import Treemap from './../../components/Treemap';

const footer = (
  <Fragment>
    <div>Please note the above treemap is a representation of the allocation of the National Revenue Fund to functions of government.</div>
    <div>Budget data for the financial year 1 April 2019 - 31 March 2020</div>
  </Fragment>
)


const Markup = ({ items, initialSelected }) => (
  <ChartSection
    {...{ initialSelected, footer }}
    chart={(onSelectedChange) => <Treemap {...{ items, onSelectedChange }} />}
    verb='Explore'
    subject='this focus area'
    title='Consolidated Budget Summary'
    phases={{
      disabled: "Original budget",
    }}
    years={{
      disabled: "2019-20",
    }}
    anchor="consolidated-treemap"
  />
)

const NationalTreemap = props => (
  <MediaQuery query="(min-width: 600px)">
    {matches => !!matches && calcIfForeignObjectIsSupported() && <Markup {...props} />}
  </MediaQuery>
);

export default NationalTreemap;