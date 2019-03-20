import React, { Component } from 'react';
import Markup from './Markup';
import { colorArray } from './Treemap/data/colors'
import styled from 'styled-components';
import trimValues from '../../helpers/trimValues';

class TreeMapSection extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.initTreemap = this.initTreemap.bind(this);
    this.state = {
      selected: null,
      buttonState: false,
      departments: [{"color":"#FFD54F","amount":184791972000,"budget_phase":"Main appropriation","detail":"/2019-20/national/departments/social-development","financial_year":2019,"name":"Social Development","percentage_of_total":20.890679251027038}]
    };

    this.events = {
      eventHandler: this.eventHandler.bind(this),
    }
  }

  eventHandler(e) {
    this.setState({ selected: e, buttonState: !this.state.buttonState });
  }

  initTreemap(data) {
    return window.d3plus.viz()
      .container("#treemap")
      .data(this.state.departments)
      .type("tree_map")
      .id("name")
      .size("amount")
      .font({ "family": "Roboto", size: 15 })
      .labels({"align": "left", "valign": "top", "padding": 50, "resize": false, text: d => `${d.name} - R${trimValues(d.amount)}` })
      .color(d => d.color ? d.color : "")
      .legend(false)
      .resize(true)
      .mouse({
        click: this.eventHandler
      })
      .draw();
  }

  componentDidMount() {
    const a = this.initTreemap();

    setTimeout(function() {
      a.data([{"color":"#E0E0E0","amount":18479197200,"budget_phase":"Main appropriation","detail":"/2019-20/national/departments/social-development","financial_year":2019,"name":"Social Development","percentage_of_total":10.890679251027038}]).draw();
    },3000);
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
