import React, { Fragment } from 'react';
import MediaQuery from "react-media";

import calcIfForeignObjectIsSupported from './calcIfForeignObjectIsSupported';
import ChartSection from './../../components/ChartSection';
import Treemap from './../../components/Treemap';
import StackChart from './../../components/StackChart';

const footer = (
  <Fragment>
    <div>Please note the above treemap is a representation of expenditure of national government departments.</div>
    <div>Budget data for the financial year 1 April 2019 - 31 March 2020</div>
  </Fragment>
)


const Markup = ({ items, initialSelected, isMobile }) => (
  <ChartSection
    {...{ initialSelected, footer }}
    isMobile={isMobile}
    chart={(onSelectedChange) => isMobile
      ? <StackChart {...{ items, onSelectedChange }} canStickToTop hasChildren={false}/> 
      : <Treemap {...{ items, onSelectedChange }} />
    }
    verb='Explore'
    subject='this department'
    title='National Budget Summary'
    phases={{
      disabled: "Original budget",
    }}
    years={{
      disabled: "2019-20",
    }}
    anchor="national-treemap"
  />
)

const NationalTreemap = props => (
  <MediaQuery query="(min-width: 1000px)">
    {matches => calcIfForeignObjectIsSupported() && <Markup {...props} isMobile={!matches}/>}
  </MediaQuery>
);

export default NationalTreemap;
