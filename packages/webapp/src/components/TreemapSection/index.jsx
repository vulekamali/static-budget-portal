import React, { Component } from 'react';
import Markup from './Markup';
import { colorArray } from './Treemap/data/colors'

class TreeMapSection extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.state = {
      selected: null,
      buttonState: false
    };

    this.events = {
      eventHandler: this.eventHandler.bind(this),
    }
  }

  eventHandler(e) {
    this.setState({ selected: e, buttonState: !this.state.buttonState });
  }


  render() {
    const { state, events, props } = this;
    const { spendingData, isNationalBudget } = props;
    let totalBudget = null;
    let sortedBudgetColor = null;
    if (spendingData !== null) {
      const deptAmounts = spendingData.expenditure.national;
      const originalBudget = deptAmounts.filter(function (amount) {
        return amount['budget_phase'] === "Main appropriation" && amount.financial_year === 2019;
      });
      let sortedBudget = originalBudget.sort((a, b) => b.amount - a.amount);
      const colored = index => colorArray[index];

      sortedBudgetColor = sortedBudget.map((amount, index) => ({
        color: colored(index),
        ...amount
      }));

      totalBudget = spendingData['total_budgets']['Main appropriation']['2019'];
    }


    const passedProps = {
      isNationalBudget,
      latestBudget: sortedBudgetColor,
      totalBudget,
      eventHandler: events.eventHandler,
      selected: state.selected,
      buttonState: state.buttonState
    };

    return <Markup {...passedProps } />
  }
}


export default TreeMapSection;
