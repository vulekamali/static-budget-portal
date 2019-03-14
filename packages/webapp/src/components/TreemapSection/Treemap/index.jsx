import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3plus from "d3plus";
// import data from "./data/test.json";

const TreemapContained = styled.div`
  height: 500px;
  width: 1000px;
`;

class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.treemap = React.createRef();
    this.event = props.event;
    // this.state = { data }
  }

  data = [
    {
      "amount": 6408750000,
      "budget_phase": "Main appropriation",
      "financial_year": 2018,
      "name": "Agriculture, Forestry and Fisheries",
      "detail": "fake_url_path_1"
    },
    {
      "amount": 4809420000,
      "budget_phase": "Main appropriation",
      "financial_year": 2018,
      "name": "Health",
      "detail": "fake_url_path_2"
    },
    {
      "amount": 3653650000,
      "budget_phase": "Main appropriation",
      "financial_year": 2018,
      "name": "Police",
      "detail": "fake_url_path_3"
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
