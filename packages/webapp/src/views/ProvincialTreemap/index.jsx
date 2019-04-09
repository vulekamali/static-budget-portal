import React from 'react';
import MediaQuery from "react-media";

import calcIfForeignObjectIsSupported from './calcIfForeignObjectIsSupported';
import ChartSection from './../../components/ChartSection';
import Treemap from './../../components/Treemap';

const Markup = ({ items, initialSelected }) => (
  <ChartSection
    {...{ initialSelected }}
    footer="Budget data from 1 April 2018 - 31 March 2019"
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
