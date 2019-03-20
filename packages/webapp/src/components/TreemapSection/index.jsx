import React, { Component } from 'react';
import Markup from './Markup';
import { colorArray } from './Treemap/data/colors'

class TreeMapSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      buttonState: false,
      departmentData: this.props.spendingData,
      zoomIndex: 0,
      isNationalBudget: true,
    };

    this.events = {
      eventHandler: this.eventHandler.bind(this),
      eventZoomIn: this.eventZoomIn.bind(this),
      eventZoomOut: this.eventZoomOut.bind(this)
    }
  }

  eventZoomIn() {
    console.log('Zooming out; increasing index by 1');
    let { zoomIndex, departmentData } = this.state;
    const fullData = this.props.spendingData['expenditure']['national'];
    zoomIndex += 1;
    const spliceIndex = 5 * zoomIndex;
    const splicedData = fullData.splice(spliceIndex, fullData.length);
    console.log(fullData);
    console.log(splicedData);
    departmentData['expenditure']['national'] = splicedData;
    this.setState({
      departmentData: departmentData,
      zoomIndex: zoomIndex,
    });
    // this.initTreemap()
  }

  eventZoomOut() {
    console.log('Zooming out; decreasing index by 1');
    let { zoomIndex } = this.state;
    const fullData = this.props.spendingData['expenditure']['national'];
    zoomIndex -= 1;
    const spliceIndex = 5 * zoomIndex;
    const splicedData = fullData.splice(spliceIndex, fullData.length);
    console.log(splicedData);
    this.setState({
      departmentData: splicedData,
      zoomIndex: zoomIndex,
    });
    // this.initTreemap()
  }

  eventHandler(e) {
    this.setState({ selected: e, buttonState: !this.state.buttonState });
  }


  render() {
    const { state, events } = this;
    const { departmentData, isNationalBudget } = state;
    let totalBudget = null;
    let sortedBudgetColor = null;
    if (departmentData !== null) {
      const deptAmounts = departmentData['expenditure']['national'];
      const originalBudget = deptAmounts.filter(function (amount) {
        return amount['budget_phase'] === "Main appropriation" && amount.financial_year === 2019;
      });
      let sortedBudget = originalBudget.sort((a, b) => b.amount - a.amount);
      const colored = index => colorArray[index];

      sortedBudgetColor = sortedBudget.map((amount, index) => ({
        color: colored(index),
        ...amount
      }));

      totalBudget = departmentData['total_budgets']['Main appropriation']['2019'];
    }
    console.log(sortedBudgetColor);

    const passedProps = {
      isNationalBudget,
      latestBudget: sortedBudgetColor,
      totalBudget,
      eventHandler: events.eventHandler,
      selected: state.selected,
      buttonState: state.buttonState,
      eventZoomIn: events.eventZoomIn,
      eventZoomOut: events.eventZoomOut,
    };

    return <Markup {...passedProps } />
  }
}


export default TreeMapSection;
