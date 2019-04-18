import * as d3 from "d3";
import trimValues from '../../helpers/trimValues';

export function calculateId(rootIndex, currIndex) {
  return rootIndex * 10000 + currIndex;
}

export function truncatedLabel(label, maxLen = 40) {
  if (label.length > maxLen) {
    return label.slice(0, maxLen - 2) + "..";
  } 
  return label;
}

export default function StackChart(containerNode) {
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

  this.getActiveLv1Idx = function(scrollTop) {
    const { items } = chartOptions;

    for (var i = 0; i < items.length; i ++) {
      if (scrollTop <= items[i].initialOffset + items[i].totalHeight) {
        return i;
      }
    }
    return 0;
  }

  this.getActiveLv2Idx = function(scrollTop) {
    const { items } = chartOptions;

    for (var i = 0; i < items.length; i ++) {
      var item = items[i];
      if (scrollTop <= items[i].initialOffset + items[i].totalHeight) {
        var itemL2s = item.children;
        for (var j = 0; j < itemL2s.length; j ++) {
          var item2 = itemL2s[j];
          if (scrollTop <= item.initialOffset + item2.initialOffset + item2.totalHeight) {
            return [i, j];
          }
        }
      }
    }
    return [0,0];
  }

  this.updateSelection = function(Lv1Idx, Lv2Idx, scrollTop) {
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

    var nextSelectId = calculateId(Lv1Idx, Lv2Idx);
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

    // find minimum amount and total amount

    var minVal = d3.min(items.map(item => d3.min(item.children.map(subItem => subItem.amount))));
    var maxVal = d3.max(items.map(item => d3.max(item.children.map(subItem => subItem.amount))));

    var scaleY = d3.scaleLinear()
      .domain([minVal, maxVal])
      .range([minBoxHeight, visibleHeight * 3/4])

    var offset = 0;
    for (var i = 0; i < items.length; i ++) {
      var subOffset = 0;
      for (var j = 0; j < items[i].children.length; j ++) {
        items[i].children[j].initialOffset = subOffset;
        items[i].children[j].totalHeight = scaleY(items[i].children[j].amount);
        subOffset += scaleY(items[i].children[j].amount);
      }

      items[i].initialOffset = offset;
      items[i].totalHeight = subOffset + groupLabelHeight;
      offset += subOffset + groupLabelHeight;
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
      .attr("transform", (item, idx) => `translate(0, ${item.initialOffset})`);

    items.forEach((item, idx) => {
      var itemSvg = svg.selectAll(`.itemLv1.idx-${idx}`);
      var itemLabelSvg = itemSvg
        .append("g")
        .attr("class", "itemLabel");

      itemLabelSvg.append("text")
        .attr("class", "groupLabel")
        .attr("clip-path", "url(#labelClipPath)")
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
          `translate(0, ${itemL2.initialOffset})`)
        .attr("id", (itemL2, idx2) => `id-${calculateId(idx, idx2)}`)
      
      itemL2s.forEach((item2, idx2) => {
        var item2Svg = itemSvg.selectAll(`.itemLv2.idx2-${idx2}`);
        function handleClick(d) {
          var scrollToPosition = item.initialOffset + item2.initialOffset + 1;
          handleClickEvent(scrollToPosition);
        }

        item2Svg.append("rect")
          .attr("class", "item2Rect")
          .attr("x", calculateId(idx, idx2) == selected? selectedOffset: 0)
          .attr("y", 0)
          .attr("width", viewportWidth - selectedOffset)
          .attr("height", item2.totalHeight - subItemOffset)
          .attr("fill", fills[idx])
          .on("mouseover", function(d) {
            d3.select(this).style("opacity", 0.8);
          })
          .on("mouseout", function(d) {
            d3.select(this).style("opacity", 1);
          })
          .on("click", handleClick);

        var textY = (Math.min(groupLabelHeight, item2.totalHeight)  + fontHeight) / 2 - subItemOffset;
        
        item2Svg.append("text")
          .attr("class", "subItemLabel" + (item2.totalHeight - subItemOffset < smallFontBlockH? " smallFont": ""))
          .attr("clip-path", "url(#labelClipPath)")
          .attr("x", subItemTextOffsetX)
          .attr("y", textY)
          .text(item2.name)
          .on("click", handleClick);

        item2Svg.append("text")
          .attr("class", "subItemLabel")
          .attr("x", viewportWidth - subItemTextOffsetX)
          .attr("y", textY )
          .attr("text-anchor", "end")
          .text(`R${trimValues(item2.amount, true)}`)
          .on("click", handleClick);
      })
    })
  }
  this.destroy = function() {
    svg.remove();
  }
}