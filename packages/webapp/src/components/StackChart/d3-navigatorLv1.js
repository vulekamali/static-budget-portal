import * as d3 from "d3";

export default function Navigator(containerNode) {
  var container = d3.select(containerNode);
  var svg = null;
  
  var viewBoxHeight = 8;
  var viewportWidth = 0;

  this.draw = function(options) {
    container.selectAll("svg").remove();
    svg = container.append("svg")
      .classed("svg-content", true);

    const { 
      items, 
      fills, 
      screenWidth, 
      scrollTopPercent,
      windowPercent 
    } = options;

    viewportWidth = screenWidth - 32;
    
    // calculate total amount
    var sumVal = 0;
    for (var i = 0; i < items.length; i ++) {
      items[i].initialOffsetAmount = sumVal;
      sumVal += items[i].amount;
    }

    var subItemOffset = 1;

    var scaleX = d3.scaleLinear()
      .domain([0, sumVal])
      .range([0, viewportWidth]);
    

    svg.attr("viewBox", "0 0 " + (viewportWidth) + " " + (viewBoxHeight));
    svg.attr("width", viewportWidth)
      .attr("height", viewBoxHeight);

    var itemSvgs = svg.selectAll(".item-lv1").data(items);
    
    itemSvgs.enter()
      .append("g")
      .attr("class", (item, idx) => `item-lv1 idx-${idx}`)
      .attr("transform", (item, idx) => `translate(${scaleX(item.initialOffsetAmount)}, 0)`);

    items.forEach((item, idx) => {
      var itemSvg = svg.selectAll(`.item-lv1.idx-${idx}`);

      itemSvg.append("rect")
          .attr("class", "item2Rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", Math.max(scaleX(item.amount) - subItemOffset, 0))
          .attr("height", viewBoxHeight)
          .attr("fill", fills[idx]);
    })

    svg.append("rect")
      .attr("class", "domainWindow")
      .attr("x", scrollTopPercent * viewportWidth)
      .attr("y", 0)
      .attr("width", windowPercent * viewportWidth)
      .attr("height", viewBoxHeight)
      .attr("fill", "purple")
      .attr("stroke", "purple")
      .attr("stroke-width", 1)
      .style("opacity", 0.5);
  }

  this.updateDomainWindow = function(scrollTopPercent, windowPercent) {
    svg.selectAll(".domainWindow").remove();

    svg.append("rect")
      .attr("class", "domainWindow")
      .attr("x", scrollTopPercent * viewportWidth)
      .attr("y", 0)
      .attr("width", windowPercent * viewportWidth)
      .attr("height", viewBoxHeight)
      .attr("fill", "purple")
      .attr("stroke", "purple")
      .attr("stroke-width", 1)
      .style("opacity", 0.5);
  }

  this.destroy = function() {
    svg.remove();
  }
}