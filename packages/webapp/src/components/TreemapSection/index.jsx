import React, {Component} from 'react';
import Markup from './Markup';
import {colorArray} from './Treemap/data/colors'
import trimValues from '../../helpers/trimValues';

class TreeMapSection extends Component {
    constructor(props) {
        super(props);
        this.initTreemap = this.initTreemap.bind(this);
        let sortedBudgetColor = null;
        let departmentData = this.props.spendingData;
        if (departmentData !== null) {
            const deptAmounts = departmentData['expenditure']['national'];
            const originalBudget = deptAmounts.filter(function (amount) {
                return amount['budget_phase'] === "Main appropriation" && amount.financial_year === 2019;
            });
            let sortedBudget = originalBudget.sort((a, b) => b.amount - a.amount);
            const colored = index => colorArray[index];
            sortedBudgetColor = sortedBudget.map((amount, index) => ({
                color: colored(index),
                ...amount
            }));
            departmentData.expenditure.national = sortedBudgetColor;
        }
        this.state = {
            selected: null,
            zoomInButtonState: false,
            zoomOutButtonState: true,
            departmentData: departmentData,
            zoomIndex: 0,
            isNationalBudget: true,
        };
        this.events = {
            eventZoomIn: this.eventZoomIn.bind(this),
            eventZoomOut: this.eventZoomOut.bind(this)
        };
        this.eventHandler = this.eventHandler.bind(this);
    }

    eventHandler(data) {
        console.log('Event fired!');
        console.log(data);
    }

    eventZoomIn() {
        let {zoomIndex, departmentData} = this.state;
        zoomIndex += 1;
        const spliceIndex = this.zoomStep * zoomIndex;
        let splicedData = [...this.fullData];
        if (spliceIndex <= this.fullData.length) {
            splicedData.splice(0, spliceIndex);
            departmentData['expenditure']['national'] = splicedData;
            this.setState({
                departmentData: departmentData,
                zoomIndex: zoomIndex,
                zoomInButtonState: false,
                zoomOutButtonState: false,
            });
            console.log(this.treemapNode);
            // this.treemapNode.data(splicedData).draw();
        }
        if (spliceIndex+this.zoomStep >= this.fullData.length) {
            this.setState({
                zoomInButtonState: true
            })
        }
    }

    eventZoomOut() {
        let {zoomIndex, departmentData} = this.state;
        zoomIndex -= 1;
        const spliceIndex = 5 * zoomIndex;
        let splicedData = [...this.fullData];
        if (spliceIndex >= 0) {
            splicedData.splice(0, spliceIndex);
            departmentData['expenditure']['national'] = splicedData;
            this.setState({
                departmentData: departmentData,
                zoomIndex: zoomIndex,
                zoomOutButtonState: false,
                zoomInButtonState: false,
            });
            this.treemapNode.data(splicedData).draw();
        }
        if (zoomIndex === 0) {
            this.setState({
                zoomOutButtonState: true
            })
        }
    }

    // initTreemap() {
    //     return window.d3plus.viz()
    //         .container("#treemap")
    //         .data(this.state.departmentData.expenditure.national)
    //         .type("tree_map")
    //         .id("name")
    //         .size("amount")
    //         .font({"family": "Roboto", size: 15})
    //         .labels({
    //             "align": "left",
    //             "valign": "top",
    //             "padding": 50,
    //             "resize": false,
    //             text: d => `${d.name} - R${trimValues(d.amount)}`
    //         })
    //         .color(d => d.color ? d.color : "")
    //         .legend(false)
    //         .resize(true)
    //         .mouse({
    //             click: this.eventHandler
    //         })
    //         .draw();
    // }

    componentDidMount() {
        this.treemapNode = this.initTreemap(this.eventHandler);
        this.fullData = this.props.spendingData['expenditure']['national'];
        this.zoomStep = 5;
    }

    initTreemap(clickCallback) {

    const parent = window.d3.select('#treemap');
    const svg = parent.append("svg");
    const gNode = svg.append("g");
    const treemapLayout = window.d3.treemap();

    const hierarchy = {
      "children": this.state.departmentData.expenditure.national,
    };
    var rootNode = window.d3.hierarchy(hierarchy);
    console.log(rootNode);
    rootNode.sum(function(d) {
      return d.amount;
    });

    var paddingAllowance = 2;
    var nodes = gNode
        .selectAll("g")
        .data(rootNode.descendants())
        .enter()
        .append("g");

    nodes
      .append("rect")
      .style("fill", function(d) {
        return d.data.color;
      })
      .on("click", function(d) {
          console.log(d);
        clickCallback(d.data);
      });

    nodes
      .append("text")
      .on("click", function(d) {
        clickCallback(d.data);
      });

    const resize = function() {
      const width = parseFloat(parent.style("width"));
      const height = parseFloat(parent.style("height"));
      treemapLayout.size([width, height]);
      treemapLayout(rootNode);
      gNode
        .selectAll("g")
        .attr("transform", function(d) {
          return "translate(" + [d.x0, d.y0] + ")";
        });
      gNode
        .selectAll("rect")
        .attr("width", function(d) {
          return d.x1 - d.x0;
        })
        .attr("height", function(d) {
          return d.y1 - d.y0;
        });
      const nameFontSize = 16;
      const textPadding = 16;
      gNode
        .selectAll("text")
        .attr("transform", "translate(" + textPadding + ", " + (textPadding + nameFontSize) + ")")
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
    };
    resize();
    window.d3.select(window).on("resize", resize);
    return rootNode;
  }


    render() {
        const {state, events} = this;
        const {departmentData, isNationalBudget} = state;

        const passedProps = {
            isNationalBudget,
            latestBudget: departmentData.expenditure.national,
            totalBudget: departmentData['total_budgets']['Main appropriation']['2019'],
            eventHandler: events.eventHandler,
            selected: state.selected,
            zoomInButtonState: state.zoomInButtonState,
            zoomOutButtonState: state.zoomOutButtonState,
            eventZoomIn: events.eventZoomIn,
            eventZoomOut: events.eventZoomOut,
        };

        return <Markup {...passedProps} />
    }
}


export default TreeMapSection;
