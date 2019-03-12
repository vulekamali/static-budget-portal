import React, { Component } from 'react';
import * as d3plus from "d3plus";
import data from "./data/test.json";

class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.treemap = React.createRef();
    this.event = props.event;
    this.state = { data }
  }

  render() {
    return (
      <div ref={this.treemap} style={{ height: "500px", width: "1000px" }}></div>
    )
  }

  initTreemap(data,event) {
    new d3plus.Treemap()
      .layoutPadding(0)
      .data(data)
      .groupBy("name")
      .sort((a,b) => a.budget - b.budget)
      .shapeConfig({
        labelConfig: {
          verticalAlign: "top"
        }
      })
      .label((d) => `${d.name} - R${d.budget} Billion`)
      .select(this.treemap.current)
      .on("click",event)
      .sum("budget")
      .render();
  }

  componentDidMount() {
    this.initTreemap(this.state.data,this.event);
  }
}

class TreeMapComponent extends Component {

  render() {
    return (
      <div>
        <TreeMap event={this.eventHandler}/>
      </div>
    );
  }
}

export default TreeMap;
