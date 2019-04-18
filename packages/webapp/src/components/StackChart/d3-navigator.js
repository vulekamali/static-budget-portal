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
      items[i].initialOffset = sumVal;
      sumVal += items[i].amount;

      var subSumVal = 0;
      for (var j = 0; j < items[i].children.length; j ++) {
        items[i].children[j].initialOffset = subSumVal;
        subSumVal += items[i].children[j].amount;
      }
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
      .attr("transform", (item, idx) => `translate(${scaleX(item.initialOffset)}, 0)`);

    items.forEach((item, idx) => {
      var itemSvg = svg.selectAll(`.item-lv1.idx-${idx}`);
      
      var itemL2s = item.children;
      var itemL2Svgs = itemSvg.selectAll(".item-lv2").data(itemL2s);
      itemL2Svgs.enter()
        .append("g")
        .attr("class", (itemL2, idx2) => `item-lv2 idx2-${idx2}`)
        .attr("transform", (itemL2, idx2) => `translate(${scaleX(itemL2.initialOffset)}, 0)`);
      
      itemL2s.forEach((item2, idx2) => {
        var item2Svg = itemSvg.selectAll(`.item-lv2.idx2-${idx2}`);

        item2Svg.append("rect")
          .attr("class", "item2Rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", Math.max(scaleX(item2.amount) - subItemOffset, 0))
          .attr("height", viewBoxHeight)
          .attr("fill", fills[idx]);
      })
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