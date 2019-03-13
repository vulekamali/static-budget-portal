import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3plus from "d3plus";
import data from "./data/test.json";

const TreemapContained = styled.div`
  height: 500px;
  width: 1000px;
`;

class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.treemap = React.createRef();
    this.event = props.event;
    this.state = { data }
  }

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
    this.initTreemap(this.state.data,this.event);
  }
}

export default TreeMap;
