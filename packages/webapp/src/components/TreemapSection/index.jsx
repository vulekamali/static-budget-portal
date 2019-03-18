import React, { Component } from 'react';
import Markup from './Markup';
import { colorArray } from './Treemap/data/colors'

class TreeMapSection extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.state = {
      selected: null
    }

    this.events = {
      eventHandler: this.eventHandler.bind(this),
    }
  }

  eventHandler(e) {
    this.setState({ selected: e });
  }





  render() {
    const { state, events, props } = this;
    const { spendingData, isNationalBudget } = props;

    const deptAmounts = spendingData.expenditure.national;
    const originalBudget = deptAmounts.filter(function(amount) {
      return amount.budget_phase === "Main appropriation" && amount.financial_year === 2019;
    });
    const sorted = originalBudget.sort((a, b) => b.amount - a.amount);
    const biggest = sorted;
    const colored = index => colorArray[index];

    const addedColor = biggest.map((amount, index) => ({
      color: colored(index),
      ...amount
    }));

    console.log(spendingData.total_budgets['Main appropriation']['2019']);

    const passedProps = {
      isNationalBudget,
      latestBudget: addedColor,
      eventHandler: events.eventHandler,
      selected: state.selected
    };

    return <Markup {...passedProps } />
  }
}


export default TreeMapSection;
