import React, { Component }  from 'react';
import ReactDOM from "react-dom";


import trimValues from '../../helpers/trimValues';
import Icon from '@material-ui/icons/ArrowForward';
import SectionHeading from '../SectionHeading';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
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

const callDetails = (selected, verb, subject, isConsolidatedChart, stickToTop) => {
  const { name, value, url, color } = selected;
  return (
    <DetailsWrapper className={stickToTop && "StickToTop"}>
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
      stickToTop: false
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
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

    // console.log("handleScroll chartSection", scrollTop, headerBoundingRect, footerBoundingRect)

    if (footerBoundingRect.bottom > 0
        && headerBoundingRect.bottom <= 17) { // when component is Active && header is not visible
      this.setState({stickToTop: true});
    } else {
      this.setState({stickToTop: false});
    }
  }

  render() {
    const {
      chart,
      isMobile,
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
      stickToTop
    } = this.state;
    
    return (
      <React.Fragment>
        <CssBaseline/>
        <SectionHeading 
          ref="header"
          title={title} 
          share={anchor} 
          years={years} 
          phases={phases} />
        {!!selected && callDetails(selected, verb, subject, isConsolidatedChart, false)} 
        {!!selected && stickToTop && callDetails(selected, verb, subject, isConsolidatedChart, true)} 
        {callChart(chart, onSelectedChange)}
        <FooterWrapper ref="footer">
          <FooterContainer>
            {footer && <FooterDetails>{footer}</FooterDetails>}
          </FooterContainer>
        </FooterWrapper>
      </React.Fragment>
    );
  }
};

export default Markup;
