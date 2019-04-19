import * as d3 from "d3";
import trimValues from '../../helpers/trimValues';

export function calculateId(currIndex) {
  return currIndex;
}

export default function StackChartLv1(containerNode) {
  var container = d3.select(containerNode);
  var svg = null;
 
  var chartOptions = {}; 

  var fontHeight = 12;
  var groupLabelHeight = 32;
  var subItemOffset = 2;
  var subItemTextOffsetX = 10;
  var selectedOffset = 4;

  var minBoxHeight = 19;
  var windowHeight = window.innerHeight;
  var headerStickyHeight = 140;
  // update on window size change
  var visibleHeight = windowHeight - headerStickyHeight; 
  var smallFontBlockH = 31;

  this.getActiveIdx = function(scrollTop) {
    const { items } = chartOptions;

    for (var i = 0; i < items.length; i ++) {
      if (scrollTop <= items[i].initialOffset + items[i].totalHeight) {
        return i;
      }
    }
    return 0;
  }

  this.updateSelection = function(Lv1Idx) {
    var prevItem = svg.select(".selectedItem2");
    prevItem.select(`rect`)
      .transition()
      .duration(100)
      .attr("x", 0);
    prevItem.select(`text`)
      .transition()
      .duration(100)
      .attr("x", subItemTextOffsetX);
    prevItem
      .classed("selectedItem2", false);

    var nextSelectId = calculateId(Lv1Idx);
    svg.select(`#id-${nextSelectId} rect`)
      .transition()
      .duration(100)
      .attr("x", selectedOffset);
    svg.select(`#id-${nextSelectId} text`)
        .transition()
        .duration(100)
        .attr("x", subItemTextOffsetX + selectedOffset);
    svg.select(`#id-${nextSelectId}`)
      .classed("selectedItem2", true);
  }

  this.draw = function(options) {
    container.selectAll("svg").remove();
    svg = container.append("svg")
      .classed("svg-content", true);

    const { 
      items, 
      selected, 
      fills, 
      screenWidth, 
      handleClickEvent
    } = options;
    chartOptions = options;
    var viewportWidth = screenWidth - 64;

    var minVal = d3.min(items.map(subItem => subItem.amount));
    var maxVal = d3.max(items.map(subItem => subItem.amount));

    var scaleY = d3.scaleLinear()
      .domain([minVal, maxVal])
      .range([minBoxHeight, visibleHeight * 3/4])

    var offset = 0;
    for (var i = 0; i < items.length; i ++) {
      var totalHeight = scaleY(items[i].amount);
      items[i].initialOffset = offset;
      items[i].totalHeight = totalHeight;
      offset += totalHeight;
    }

    var viewBoxHeight = offset;
    
    svg.attr("viewBox", "0 0 " + (viewportWidth) + " " + (viewBoxHeight));
    svg.attr("width", viewportWidth)
      .attr("height", viewBoxHeight);


    svg.append("clipPath")
      .attr("id", "labelClipPath")
    .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", viewportWidth - 90)
      .attr("height", viewBoxHeight);   

    var itemSvgs = svg.selectAll(".itemLv1").data(items);
    
    itemSvgs.enter()
      .append("g")
      .attr("class", (item, idx) => `itemLv1 idx-${idx}`)
      .attr("transform", (item, idx) => `translate(0, ${item.initialOffset})`)
      .attr("id", (item, idx) => `id-${calculateId(idx)}`);

    items.forEach((item, idx) => {
        var itemSvg = svg.selectAll(`.itemLv1.idx-${idx}`);

        function handleClick(d) {
            var scrollToPosition = item.initialOffset + 1;
            handleClickEvent(scrollToPosition);
        }

        itemSvg.append("rect")
            .attr("class", "item2Rect")
            .attr("x", calculateId(idx) == selected? selectedOffset: 0)
            .attr("y", 0)
            .attr("width", viewportWidth - selectedOffset)
            .attr("height", item.totalHeight - subItemOffset)
            .attr("fill", fills[idx])
            .on("mouseover", function() {
                d3.select(this).style("opacity", 0.8);
            })
            .on("mouseout", function() {
                d3.select(this).style("opacity", 1);
            })
            .on("click", handleClick);

        var textY = (Math.min(groupLabelHeight, item.totalHeight)  + fontHeight) / 2 - subItemOffset;
        
        itemSvg.append("text")
            .attr("class", "subItemLabel" + (item.totalHeight - subItemOffset < smallFontBlockH? " smallFont": ""))
            .attr("clip-path", "url(#labelClipPath)")
            .attr("x", subItemTextOffsetX)
            .attr("y", textY)
            .text(item.name)
            .on("click", handleClick);

        itemSvg.append("text")
            .attr("class", "subItemLabel")
            .attr("x", viewportWidth - subItemTextOffsetX)
            .attr("y", textY )
            .attr("text-anchor", "end")
            .text(`R${trimValues(item.amount, true)}`)
            .on("click", handleClick);
        })
  }
  this.destroy = function() {
    svg.remove();
  }
}