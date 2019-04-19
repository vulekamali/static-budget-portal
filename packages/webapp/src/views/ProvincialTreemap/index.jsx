import React from 'react';
import MediaQuery from "react-media";

import calcIfForeignObjectIsSupported from './calcIfForeignObjectIsSupported';
import ChartSection from './../../components/ChartSection';
import Treemap from './../../components/Treemap';
import StackChart from './../../components/StackChart';

const Markup = ({ items, initialSelected, isMobile }) => (
  <ChartSection
    {...{ initialSelected }}
    isMobile={isMobile}
    footer="Budget data from 1 April 2018 - 31 March 2019"
    chart={(onSelectedChange) => isMobile
      ? <StackChart {...{ items, onSelectedChange }} canStickToTop hasChildren={false}/> 
      : <Treemap {...{ items, onSelectedChange }} />
    }
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
  <MediaQuery query="(min-width: 1000px)">
    {
      matches => calcIfForeignObjectIsSupported() && <Markup {...props} isMobile={!matches}/>
    }
  </MediaQuery>
);

export default ProvincialTreemap;
