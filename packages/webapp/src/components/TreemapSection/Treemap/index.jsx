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
      .legend(false)
      .shapeConfig({
        labelConfig: {
          verticalAlign: "top"
        }
      })
      .label((d) => `${d.name} - R${trimValues(d.amount)}`)
      .select(this.treemap.current)
      .on("click",event)
      .sum("amount")
      .render();
  }

  componentDidMount() {
    this.initTreemap(this.props.data,this.event);
  }
}

export default TreeMap;

// R{selected ? trimValues(selected.amount) : `Total`}
