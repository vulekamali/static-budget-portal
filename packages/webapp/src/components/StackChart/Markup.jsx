import React, { Component } from 'react';
import * as d3 from "d3";

import { Treemap, Tooltip } from 'recharts';

import NaviChart from './d3-navigator';
import StackBodyChart from './d3-stackchart';

import Block from './Block';
import TooltipContent from './TooltipContent';
import LeftIcon from '@material-ui/icons/ArrowBack';
import trimValues from '../../helpers/trimValues';

import {
  StackChartWrapper,
  StackChartButtonStyle,
  StackChartButtonText,
  Navigator,
  FocusItem,
  StackChartBody
 } from './styled';

const createBlock = (fills, changeSelectedHandler, selected, zoom) => {
  return props => {
    const passedProps = { ...props, fills, changeSelectedHandler, selected, zoom };
    return <Block {...passedProps} />;
  };
};

class Markup extends Component {
  constructor(props) {
    super(props);
    this.scrollTopPercent = 0;
    this.windowPercent = 1;
    this.state = {
      activeLv1Idx: 0,
    }
  }

  componentDidMount() {
    this.naviChart = new NaviChart(this.refs.navigation);
    this.bodyChart = new StackBodyChart(this.refs.stackchartbody);
    this.draw();
    this.handleScroll();
  }

  componentWillUnmount() {
    this.naviChart.destroy();
    this.bodyChart.destroy();
    this.naviChart = null;
    this.bodyChart = null;
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) != JSON.stringify(this.props)) {
      this.draw();
      this.handleScroll();
    }
  }

  draw() {
    const {
      scrollTopPercent,
      windowPercent
    } = this;
    if (this.naviChart) {
      this.naviChart.draw({
        ...this.props,
        scrollTopPercent,
        windowPercent
      });
    }
    if (this.bodyChart) {
      this.bodyChart.draw(this.props);
    }
  }

  createButton() {
    const { unsetZoomHandler } = this.props;
    return (
      <StackChartButtonStyle onClick={unsetZoomHandler}>
        <LeftIcon />
        <StackChartButtonText component='span'>Provinces</StackChartButtonText>
      </StackChartButtonStyle>
    );
  }

  handleScroll() {
    var bodyEle = this.refs.stackchartbody;
    var scrollHeight = bodyEle.scrollHeight;
    var scrollTop = bodyEle.scrollTop;
    var clientHeight = bodyEle.clientHeight;
    var activeLv1Idx = this.bodyChart.getActiveLv1Idx(scrollTop);
    var scrollTopPercent = scrollTop/scrollHeight;
    var windowPercent = clientHeight/scrollHeight;
    this.scrollTopPercent = scrollTopPercent;
    this.windowPercent = windowPercent;

    this.setState({activeLv1Idx});
    this.naviChart.updateDomainWindow(scrollTopPercent, windowPercent);
  }

  render() {
    const { items, changeSelectedHandler, selected, fills, screenWidth, zoom, hasChildren, unsetZoomHandler } = this.props;
    const widthWithPadding = screenWidth - 48;
    const width = widthWithPadding > 1200 ? 1200 : widthWithPadding;

    const {
      activeLv1Idx 
    } = this.state;
  
    return (
      <StackChartWrapper {...{ width }}>
        <Navigator 
          ref="navigation" 
          className="Navigator">
        </Navigator>
        <StackChartBody 
          ref="stackchartbody" 
          className="StackChartBody"
          onScroll={this.handleScroll.bind(this)}
        />
        <FocusItem className="FocusItem">
          <div className="left">{this.props.items[activeLv1Idx].name}</div>
          <div className="right">R{trimValues(this.props.items[activeLv1Idx].amount)}</div>
        </FocusItem>
      </StackChartWrapper>
    )
  }
}

export default Markup;
