import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3plus from "d3plus";
// import data from "./data/test.json";

const TreemapContained = styled.div`
  height: 500px;
`;

class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.treemap = React.createRef();
    this.event = props.event;
  }

  data = [
    {
      "amount": 6408750000,
      "budget_phase": "Main appropriation",
      "financial_year": 2018,
      "name": "Agriculture, Forestry and Fisheries",
      "detail": "fake_url_path_1",
      "color": "red"
    },
    {
      "amount": 4809420000,
      "budget_phase": "Main appropriation",
      "financial_year": 2018,
      "name": "Health",
      "detail": "fake_url_path_2",
      "color": "blue"
    },
    {
      "amount": 3653650000,
      "budget_phase": "Main appropriation",
      "financial_year": 2018,
      "name": "Police",
      "detail": "fake_url_path_3",
      "color": "yellow"
    }
  ]

  render() {
    return (
      <TreemapContained ref={this.treemap} />
    )
  }

  initTreemap(data,event) {
    new d3plus.Treemap()
      .layoutPadding(0)
      .data(data)
      .groupBy("name")
      .sort((a,b) => a.budget - b.amount)
      .color("color")
      .shapeConfig({
        labelConfig: {
          verticalAlign: "top"
        }
      })
      .label((d) => `${d.name} - R${d.amount} Billion`)
      .select(this.treemap.current)
      .on("click",event)
      .sum("amount")
      .render();
  }

  componentDidMount() {
    this.initTreemap(this.data,this.event);
  }
}

export default TreeMap;
