import * as d3 from "d3";
import trimValues from '../../helpers/trimValues';

export function calculateId(rootIndex, currIndex) {
  return rootIndex * 10000 + currIndex;
}

export default function StackChart(containerNode) {
  var container = d3.select(containerNode);
  var svg = null;
 
  var chartOptions = {}; 

  var minValHeight = 40 * 3;
  var totalRectHeight = 5000 * 3;
  var fontHeight = 12 * 3;
  var groupLabelHeight = 32 * 3;
  var subItemOffset = 2 * 3;
  var subItemTextOffsetX = 10 * 3;
  var subItemTextOffsetY = 9 * 3;
  var selectedOffset = 4 * 3;

  this.getActiveLv1Idx = function(scrollTop) {
    const { items } = chartOptions;
    var lastIdx = items.length - 1;
    var sumVal = items[lastIdx].amount + items[lastIdx].initialOffset;

    var scaleY = d3.scaleLinear()
      .domain([0, sumVal])
      .range([0, totalRectHeight]);

    for (var i = 0; i < items.length; i ++) {
      if (scrollTop <= scaleY(items[i].initialOffset + items[i].amount) + i * groupLabelHeight) {
        return i;
      }
    }
    return 0;
  }

  this.getActiveLv2Idx = function(scrollTop) {
    const { items } = chartOptions;
    var lastIdx = items.length - 1;
    var sumVal = items[lastIdx].amount + items[lastIdx].initialOffset;

    var scaleY = d3.scaleLinear()
      .domain([0, sumVal])
      .range([0, totalRectHeight]);

    for (var i = 0; i < items.length; i ++) {
      var item = items[i];
      if (scrollTop <= scaleY(item.initialOffset + item.amount) + i * groupLabelHeight) {
        var itemL2s = item.children;
        for (var j = 0; j < itemL2s.length; j ++) {
          var item2 = itemL2s[j];
          if (scrollTop <= scaleY(item.initialOffset + item2.initialOffset + item2.amount) + i * groupLabelHeight) {
            return [i, j];
          }
        }
      }
    }
    return [0,0];
  }

  this.updateSelection = function(Lv1Idx, Lv2Idx) {
    var prevItem = svg.select(".selectedItem2");
    prevItem.select(`rect`)
      .transition()
      .duration(100)
      .attr("x", 0);
    prevItem
      .classed("selectedItem2", false);

    var nextSelectId = calculateId(Lv1Idx, Lv2Idx);
    svg.select(`#id-${nextSelectId} rect`)
      .transition()
      .duration(100)
      .attr("x", selectedOffset);
    svg.select(`#id-${nextSelectId}`)
      .classed("selectedItem2", true);
  }

  this.draw = function(options) {
    container.selectAll("svg").remove();
    svg = container.append("svg")
      .classed("svg-content", true);

    const { 
      items, 
      changeSelectedHandler, 
      selected, 
      fills, 
      screenWidth, 
      zoom, 
      hasChildren, 
      unsetZoomHandler,
      handleClickEvent
    } = options;
    chartOptions = options;
    var viewportWidth = screenWidth - 64;

    // find minimum amount and total amount
    var sumVal = 0;
    var minVal = Number.MAX_SAFE_INTEGER;
    for (var i = 0; i < items.length; i ++) {
      items[i].initialOffset = sumVal;
      sumVal += items[i].amount;

      var subSumVal = 0;
      for (var j = 0; j < items[i].children.length; j ++) {
        items[i].children[j].initialOffset = subSumVal;
        subSumVal += items[i].children[j].amount;

        if (items[i].children[j].amount <= 1) {
          console.error("mininum Value is less than 1 ... check it");
        }
        if (minVal > items[i].children[j].amount) {
          minVal = items[i].children[j].amount;
        }
      }
    }

    var scaleY = d3.scaleLinear()
      .domain([0, sumVal])
      .range([0, totalRectHeight]);
    
    var viewBoxHeight = totalRectHeight + groupLabelHeight * items.length;

    svg.attr("viewBox", "0 0 " + (viewportWidth) + " " + (viewBoxHeight));
    svg.attr("width", viewportWidth)
      .attr("height", viewBoxHeight);

    var itemSvgs = svg.selectAll(".itemLv1").data(items);
    
    itemSvgs.enter()
      .append("g")
      .attr("class", (item, idx) => `itemLv1 idx-${idx}`)
      .attr("transform", (item, idx) => `translate(0, ${scaleY(item.initialOffset) + idx * groupLabelHeight})`);

    items.forEach((item, idx) => {
      var itemSvg = svg.selectAll(`.itemLv1.idx-${idx}`);
      var itemLabelSvg = itemSvg
        .append("g")
        .attr("class", "itemLabel");

      itemLabelSvg.append("text")
        .attr("class", "groupLabel")
        .attr("x", 0)
        .attr("y", (groupLabelHeight + fontHeight) / 2 - subItemOffset )
        .text(item.name);

      itemLabelSvg.append("text")
        .attr("class", "groupLabel")
        .attr("x", viewportWidth)
        .attr("y", (groupLabelHeight + fontHeight) / 2 - subItemOffset )
        .attr("text-anchor", "end")
        .text(`R${trimValues(item.amount)}`);

      var itemBodySvg = itemSvg
        .append("g")
        .attr("class", "itemBody")
        .attr("transform", `translate(0, ${groupLabelHeight})`);
      
      var itemL2s = item.children;
      var itemL2Svgs = itemBodySvg.selectAll(".itemLv2").data(itemL2s);
      itemL2Svgs.enter()
        .append("g")
        .attr("class", (itemL2, idx2) => `itemLv2 idx2-${idx2} ${calculateId(idx, idx2) == selected? "selectedItem2": ""}`)
        .attr("transform", (itemL2, idx2) => 
          `translate(0, ${scaleY(itemL2.initialOffset)})`)
        .attr("id", (itemL2, idx2) => `id-${calculateId(idx, idx2)}`)
      
      itemL2s.forEach((item2, idx2) => {
        var item2Svg = itemSvg.selectAll(`.itemLv2.idx2-${idx2}`);
        function handleClick(d) {
          var scrollToPosition = (idx) * groupLabelHeight + scaleY(item.initialOffset) + scaleY(item2.initialOffset) + 1;
          handleClickEvent(scrollToPosition);
        }

        item2Svg.append("rect")
          .attr("class", "item2Rect")
          .attr("x", calculateId(idx, idx2) == selected? selectedOffset: 0)
          .attr("y", 0)
          .attr("width", viewportWidth - selectedOffset)
          .attr("height", Math.max(scaleY(item2.amount) - subItemOffset, 0))
          .attr("fill", fills[idx])
          .on("mouseover", function(d) {
            d3.select(this).style("opacity", 0.8);
          })                  
          .on("mouseout", function(d) {
            d3.select(this).style("opacity", 1);
          })
          .on("click", handleClick);
        
        if (scaleY(item2.amount) >= subItemTextOffsetY * 2 + fontHeight + subItemOffset) {
          item2Svg.append("text")
            .attr("class", "subItemLabel")
            .attr("x", subItemTextOffsetX)
            .attr("y", subItemTextOffsetY + fontHeight)
            .text(item2.name)
            .on("click", handleClick);

          item2Svg.append("text")
            .attr("class", "subItemLabel")
            .attr("x", viewportWidth - subItemTextOffsetX)
            .attr("y", (groupLabelHeight + fontHeight) / 2 - subItemOffset )
            .attr("text-anchor", "end")
            .text(`R${trimValues(item2.amount, true)}`)
            .on("click", handleClick);
        }
      })
    })
  }
  this.destroy = function() {
    svg.remove();
  }
}