import React, { Component }  from 'react';
import ReactDOM from "react-dom";


import trimValues from '../../helpers/trimValues';
import Icon from '@material-ui/icons/ArrowForward';
import SectionHeading from '../SectionHeading';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  Wrapper,
  DetailsWrapper,
  LinkWrapper,
  ButtonStyle,
  TextExploreButton,
  SpanStyled,
  DetailsContainer,
  Department,
  Amount,
  ChartWrapper,
  ChartContainer,
  FooterWrapper,
  FooterContainer,
  FooterDetails
 } from './styled';

 const callChart = (chart, onSelectedChange) => (
   <ChartWrapper>
    <ChartContainer>
      {chart(onSelectedChange)}
    </ChartContainer>
   </ChartWrapper>
 );

const callButtonExplore = (url, color,  verb, subject, isConsolidatedChart) => {
  if(isConsolidatedChart) {
    return null;
  }
  return (
    <LinkWrapper href={url}>
      <ButtonStyle disabled={!url} {...{color}}>
        <TextExploreButton>{verb} <SpanStyled>{subject}</SpanStyled></TextExploreButton>
        <Icon />
      </ButtonStyle>
    </LinkWrapper>
  );
};

const callDetails = (selected, verb, subject, isConsolidatedChart, hasChildren, stickToTop, stickToChartBottom) => {
  const { name, value, url, color } = selected;
  return (
    <DetailsWrapper 
    hasChildren={hasChildren}
    className={stickToTop? "StickToTop": stickToChartBottom? "StickToChartBottom": ""}
    >
      <DetailsContainer>
        <div>
          <Department>{name}</Department>
          <Amount>R{trimValues(value)}</Amount>
        </div>
        {callButtonExplore(url, color,  verb, subject, isConsolidatedChart)}
      </DetailsContainer>
    </DetailsWrapper>
  );
};

class Markup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      stickToTop: false,
      stickToChartBottom: false,
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    // console.log("add Event listener");
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  handleScroll(event) {
    if (!this.props.isMobile)
      return;

    var headerBoundingRect = ReactDOM.findDOMNode(this.refs.header).getBoundingClientRect();
    var footerBoundingRect = this.refs.footer.getBoundingClientRect();

    // console.log("this.props", this.props);
    var headerHeight = 143;
    var bottomLimit = 17;
    if (!this.props.hasChildren) {
      headerHeight -= 28;
    }
    var stickToTop = false;
    var stickToChartBottom = false;
    // console.log("footerBoundingRect.top > headerHeight", footerBoundingRect.top, headerHeight);
    // console.log("headerBoundingRect.bottom <= bottomLimit", headerBoundingRect.bottom, bottomLimit)
    if (footerBoundingRect.top > headerHeight
        && headerBoundingRect.bottom <= bottomLimit) { // when component is Active && header is not visible
      stickToTop = true;
    } 

    if (footerBoundingRect.top <= headerHeight) {
      stickToChartBottom = true;
    }

    this.setState({stickToTop, stickToChartBottom});
  }

  render() {
    const {
      chart,
      isMobile,
      hasChildren,
      selected,
      onSelectedChange,
      verb,
      subject,
      footer,
      years,
      phases,
      anchor,
      title,
      isConsolidatedChart
    } = this.props;

    const {
      stickToTop,
      stickToChartBottom
    } = this.state;
    
    return (
      <Wrapper>
        <CssBaseline/>
        <SectionHeading 
          ref="header"
          title={title} 
          share={anchor} 
          years={years} 
          phases={phases} />
        {!!selected && callDetails(selected, verb, subject, isConsolidatedChart, hasChildren, false, false)} 
        {!!selected && stickToTop && callDetails(selected, verb, subject, isConsolidatedChart, hasChildren, stickToTop, stickToChartBottom)} 
        {callChart(chart, onSelectedChange)}
        <FooterWrapper ref="footer">
          {!!selected && stickToChartBottom && callDetails(selected, verb, subject, isConsolidatedChart, hasChildren, stickToTop, stickToChartBottom)} 
          <FooterContainer>
            {footer && <FooterDetails>{footer}</FooterDetails>}
          </FooterContainer>
        </FooterWrapper>
      </Wrapper>
    );
  }
};

export default Markup;
