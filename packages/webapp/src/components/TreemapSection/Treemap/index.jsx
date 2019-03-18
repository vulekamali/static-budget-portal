import React, { Component } from 'react';
import styled from 'styled-components';
import trimValues from '../../../helpers/trimValues';
import * as d3plus from "d3plus";

const TreemapContained = styled.div`
  height: 500px;
`;

class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.treemap = React.createRef();
    this.event = props.event;
  }

  render() {
    return (
      <TreemapContained id="treemap" ref={this.treemap} />
    )
  }

  initTreemap(data,event) {
    window.d3plus.viz()
      .container("#treemap")
      .data(data)
      .type("tree_map")
      .id("name")
      .size("amount")
      .font({ "family": "Roboto", size: 15 })
      .labels({"align": "center", "valign": "top", "padding": 50, "resize": false })
      .color(d => d.color ? d.color : "")
      .legend(false)
      .resize(true)
      .mouse({
        click: event
      })
      .draw() 
  }

  componentDidMount() {
    this.initTreemap(this.props.data,this.event);
  }
}

export default TreeMap;

// R{selected ? trimValues(selected.amount) : `Total`}
