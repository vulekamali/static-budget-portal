import React, { Component } from 'react';
import styled from 'styled-components';
import trimValues from '../../../helpers/trimValues';
import GlobalStyle from './GlobalStyle';

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
      <React.Fragment>
        <GlobalStyle />
        <TreemapContained id="treemap" ref={this.treemap} />
      </React.Fragment>

    )
  }

  initTreemap(data, event) {
    const svg = window.d3.select('#treemap').append("svg").append("g");

    const treemapLayout = window.d3.treemap().size([400, 200]);

    const hierarchy = {
      "children": data
    }
    var rootNode = window.d3.hierarchy(hierarchy);

    rootNode.sum(function(d) {
      return d.amount;
    });

    treemapLayout(rootNode);

    var paddingAllowance = 2;
    var nodes = svg
        .selectAll("g")
        .data(rootNode.descendants())
        .enter()
        .append("g")
        .attr("transform", function(d) {
          return "translate(" + [d.x0, d.y0] + ")";
        });

    nodes
      .append("rect")
      .attr("width", function(d) {
        return d.x1 - d.x0;
      })
      .attr("height", function(d) {
        return d.y1 - d.y0;
      });
    nodes
      .append("text")
      .attr("class", "foreignObject")
      .attr("transform", "translate(3, 13)")
      .text(function(d) {
        return (d.y1 - d.y0) < 16 ? "" : d.data.name;
      })
      .filter(function(d) {
        d.tw = this.getComputedTextLength();
        return (d.x1 - d.x0) < d.tw;
      })
      .each(function(d) {
        // ridiculous routine where we test to see if label is short enough to fit
        var proposedLabel = d.data.name;
        var proposedLabelArray = proposedLabel.split("");
        while (d.tw > (d.x1 - d.x0) && proposedLabelArray.length) {
          // pull out 3 chars at a time to speed things up (one at a time is too slow)
          proposedLabelArray.pop();
          proposedLabelArray.pop();
          proposedLabelArray.pop();
          if (proposedLabelArray.length === 0) {
            proposedLabel = "";
          } else {
            proposedLabel = proposedLabelArray.join("") + "..."; // manually truncate with ellipsis
          }
          window.d3.select(this).text(proposedLabel);
          d.tw = this.getComputedTextLength();
        }
  });
  }

  componentDidMount() {
    this.initTreemap(this.props.data, this.event);
  }
}

export default TreeMap;

// R{selected ? trimValues(selected.amount) : `Total`}
