import React, { Component } from 'react';
import NaviChart from './d3-navigator';
import StackBodyChart, {calculateId} from './d3-stackchart';
import NaviLv1Chart from './d3-navigatorLv1';
import StackBodyLv1Chart, {calculateId as calculateIdLv1} from './d3-stackchartLv1';

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

class Markup extends Component {
  constructor(props) {
    super(props);
    this.scrollTopPercent = 0;
    this.windowPercent = 1;
    this.state = {
      activeLv1Idx: 0,
      activeLv2Idx: 0,
      stickToTop: false
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    var hasChildren = this.props.hasChildren;

    if (hasChildren) {
      this.naviChart = new NaviChart(this.refs.navigation);
      this.bodyChart = new StackBodyChart(this.refs.stackchartbody);
    } else {
      this.naviChart = new NaviLv1Chart(this.refs.navigation);
      this.bodyChart = new StackBodyLv1Chart(this.refs.stackchartbody);
    }
    this.draw();

    this.scrollTopPercent = 0;
    this.windowPercent = document.documentElement.clientHeight / this.refs.stackchartbody.getBoundingClientRect().height;
    this.naviChart.updateDomainWindow(this.scrollTopPercent, this.windowPercent);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.naviChart.destroy();
    this.bodyChart.destroy();
    this.naviChart = null;
    this.bodyChart = null;
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    var pickedPrevProps = (({ fills, hasChildren, items, screenWidth }) => ({ fills, hasChildren, items, screenWidth }))(prevProps);
    var pickedCurrProps = (({ fills, hasChildren, items, screenWidth }) => ({ fills, hasChildren, items, screenWidth }))(this.props);
    
    if (JSON.stringify(pickedPrevProps) != JSON.stringify(pickedCurrProps)) {
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
      this.bodyChart.draw({
        ...this.props,
        handleClickEvent: this.handleClickEvent.bind(this)
      });
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

  handleClickEvent(scrollToPosition) {
    var stackchartWrapperBoundingRect = this.refs.stackchartwrapper.getBoundingClientRect();
    var bodyEle = this.refs.stackchartbody;
    bodyEle.scrollTo({
      top: scrollToPosition + stackchartWrapperBoundingRect.top,
      behavior: 'smooth'
    });
  }

  handleScroll(event) {
    const { 
      items, 
      changeSelectedHandler, 
      fills, 
      canStickToTop,
    } = this.props;
    var hasChildren = this.props.hasChildren;
    var stickToTop = false;
    var chartHeaderSize = 81;
    var headerStickyHeight = 140;
    var stackchartWrapperBoundingRect = this.refs.stackchartwrapper.getBoundingClientRect();
    if (stackchartWrapperBoundingRect.top < chartHeaderSize && stackchartWrapperBoundingRect.bottom > headerStickyHeight && canStickToTop) {
      stickToTop = true;
    }

    var scrollHeight = this.refs.stackchartbody.getBoundingClientRect().height;
    var scrollTop = chartHeaderSize - stackchartWrapperBoundingRect.top;

    var clientHeight = document.documentElement.clientHeight;
    var scrollTopPercent = scrollTop/scrollHeight;
    var windowPercent = clientHeight/scrollHeight;

    this.scrollTopPercent = scrollTopPercent;
    this.windowPercent = windowPercent;

    if (hasChildren) { //Level 1
      var activeLv1Idx = this.bodyChart.getActiveLv1Idx(scrollTop);
      var activeLv2Idx = this.bodyChart.getActiveLv2Idx(scrollTop)[1];

      var rootIndex = activeLv1Idx;
      var currIndex = activeLv2Idx;
      var id = calculateId(rootIndex, currIndex);
      var item2 = items[rootIndex].children[currIndex];
      var amount = item2.amount;
      var name = item2.name;
  
      changeSelectedHandler({ 
        id,
        name: name,
        color: fills[rootIndex],
        value: amount,
        zoom: null,
      })
  
      this.setState({activeLv1Idx, activeLv2Idx, stickToTop});
      this.naviChart.updateDomainWindow(scrollTopPercent, windowPercent);
      this.bodyChart.updateSelection(activeLv1Idx, activeLv2Idx, scrollTop);
    } else {
      var activeLv1Idx = this.bodyChart.getActiveIdx(scrollTop);

      var itemIdx = activeLv1Idx;
      var id = calculateIdLv1(itemIdx);
      var item = items[itemIdx];
      var amount = item.amount;
      var name = item.name;
  
      changeSelectedHandler({ 
        id,
        name: name,
        color: fills[itemIdx],
        value: amount,
        zoom: null,
      })
  
      this.setState({activeLv1Idx, stickToTop});
      this.naviChart.updateDomainWindow(scrollTopPercent, windowPercent);
      this.bodyChart.updateSelection(activeLv1Idx, scrollTop);
    }
  }

  render() {
    const { screenWidth } = this.props;
    var hasChildren = this.props.hasChildren;

    const widthWithPadding = screenWidth - 48;
    const width = widthWithPadding > 1200 ? 1200 : widthWithPadding;

    const {
      activeLv1Idx,
      stickToTop 
    } = this.state;
  
    return (
      <StackChartWrapper 
        ref="stackchartwrapper"
        {...{ width }} 
        className={stickToTop && "StickToTop"}>
        <Navigator 
          ref="navigation" 
          className="Navigator"
        />
        <StackChartBody 
          ref="stackchartbody" 
          className="StackChartBody"
          onScroll={this.handleScroll.bind(this)}
        />
        {
          hasChildren && 
            <FocusItem className="FocusItem">
              <div className="left">{this.props.items[activeLv1Idx].name}</div>
              <div className="right">R{trimValues(this.props.items[activeLv1Idx].amount)}</div>
            </FocusItem>
        }
      </StackChartWrapper>
    )
  }
}

export default Markup;
