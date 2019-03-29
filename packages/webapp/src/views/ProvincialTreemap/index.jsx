import React, { Fragment } from 'react';
import MediaQuery from "react-media";

import calcIfForeignObjectIsSupported from './calcIfForeignObjectIsSupported';
import ChartSection from './../../components/ChartSection';
import Treemap from './../../components/Treemap';

const footer = (
  <Fragment>
    <div>Please note the above treemap is a representation of the allocation for National Departments as per the National Revenue Fund.</div>
    <div>Budget data from 1 April 2019 - 31 March 2020</div>
  </Fragment>
)


const Markup = ({ items, initialSelected }) => (
  <ChartSection
    {...{ initialSelected, footer }}
    chart={(onSelectedChange) => <Treemap {...{ items, onSelectedChange }} />}
    verb='Explore'
    subject='this department'
    title='Provincial Budget Summary'
    phases={{
      disabled: "Original budget",
    }}
    years={{
      disabled: "2018-19",
    }}
    anchor="provincial-treemap"
  />
)

const ProvincialTreemap = props => (
  <MediaQuery query="(min-width: 600px)">
    {matches => !!matches && calcIfForeignObjectIsSupported() && <Markup {...props} />}
  </MediaQuery>
);

export default ProvincialTreemap;
