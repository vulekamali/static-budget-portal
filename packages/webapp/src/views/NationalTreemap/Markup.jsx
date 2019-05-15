import React, { Fragment } from 'react';
import MediaQuery from "react-media";

import calcIfForeignObjectIsSupported from './calcIfForeignObjectIsSupported';
import ChartSection from './../../components/ChartSection';
import Treemap from './../../components/Treemap';

const footer = (
  <Fragment>
    <div>Please note the above treemap is a representation of expenditure of national government departments.</div>
    <div>Budget data for the financial year 1 April 2019 - 31 March 2020</div>
    <div>Direct charges against the National Revenue Fund are excluded</div>
  </Fragment>
)


const Markup = ({ items, initialSelected, loading, yearsObject, phasesObject }) => (
  <ChartSection
    {...{ initialSelected, footer, yearsObject, phasesObject }}
    chart={(onSelectedChange) => <Treemap {...{ items, onSelectedChange }} />}
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
    loading={loading}
  />
)

const NationalTreemap = props => (
  <MediaQuery query="(min-width: 600px)">
    {matches => !!matches && calcIfForeignObjectIsSupported() && <Markup {...props} />}
  </MediaQuery>
);

export default NationalTreemap;