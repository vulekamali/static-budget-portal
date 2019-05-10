import React, { Component, Fragment } from 'react';
import MediaQuery from "react-media";
import Minimap from '../../components/Minimap';

import calcIfForeignObjectIsSupported from './calcIfForeignObjectIsSupported';
import ChartSection from './../../components/ChartSection';
import Treemap from './../../components/Treemap';
import StackChart from './../../components/StackChart';

class State extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    }

    this.events = {
      changeActiveHandler: this.changeActiveHandler.bind(this),
    }
  }

  changeActiveHandler(active) {
    if (active !== this.state.active) {
      this.setState({ active });
    }
  }

  render() {
    const passedProps = {
      ...this.props,
      ...this.state,
      ...this.events,
    }

    return <NationalTreemap {...passedProps} />;
  }
}

const footer = (
  <Fragment>
    <div>Please note the above treemap is a representation of expenditure of national government departments.</div>
    <div>Budget data for the financial year 1 April 2019 - 31 March 2020</div>
    <div>Direct charges against the National Revenue Fund are excluded</div>
  </Fragment>
)

const mobileChart = (items, changeActiveHandler) => onSelectedChange => <StackChart {...{ items, onSelectedChange }} onActiveChange={changeActiveHandler} reverse threshold={65} />;
const desktopChart = items => onSelectedChange => <Treemap {...{ items, onSelectedChange }} />;
const determineChart = (items, desktop, changeActiveHandler) => desktop ? desktopChart(items) : mobileChart(items, changeActiveHandler);

const minimapFn = (items) => selected => <Minimap {...{ items, selected }} reverse />;
const determineMinimap = (items, desktop) => !desktop && minimapFn(items);

const Markup = ({ items, initialSelected, desktop, active, changeActiveHandler }) => (
  <ChartSection
    {...{ initialSelected, footer }}
    chart={determineChart(items, desktop, changeActiveHandler)}
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
    minimapRender={!!active && determineMinimap(items, desktop)}
  />
)

const NationalTreemap = props => (
  <MediaQuery query="(min-width: 600px)">
    {matches => calcIfForeignObjectIsSupported() && <Markup {...props} desktop={!!matches} />}
  </MediaQuery>
);

export default State;
