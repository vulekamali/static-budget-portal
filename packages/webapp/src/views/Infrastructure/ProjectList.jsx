import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import NationalMap from '../../components/NationalMap';
import { calcShorthand, trimValues, calcProgress } from './helpers';
import manAtLaptopImg from './man-at-laptop.jpg';


const callToActions = {
  3: {
    image: manAtLaptopImg,
    title: 'Can’t find the national department project you are looking for?',
    button: 'Download the data',
    info: '2.2MB - CSV, geoJSON',
    link: '#',
  },
  8: {
    image: manAtLaptopImg,
    title: 'Read more about major infrastructure projects in the 2019 Budget Review',
    button: 'Download the data',
    info: '2.2MB - CSV, geoJSON',
    link: '#',
  }
}


const CardHeading = styled.div`
  background-color: #F4F4F4;
  width: 100%;
  height: 85px;
  position: relative;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  background-image: ${({ image }) => (image ? `url('${image}')` : 'none')};
  background-size: cover;
  background-position: center center;
`;

const CardWrapper = styled.div`
  width: 100%;
  padding: 10px;
  border: 2px solid red;
`;

const Tag = styled.div`
  background: black;
  color: white;
  width: ${({ province }) => (province === 'Multiple' ? '80px' : '40px')};
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MapPosition = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
`;


const StyledCardContent = styled(CardContent)`
&& {
  padding: 35px 16px 16px;
  height: px;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 4px 4px;
  border: 2px solid blue;
}
`

const GreenCardContent = styled(StyledCardContent)`
  && {
    background: #76B649;
    color: white;
    padding: 10px;
    margin-bottom: 10px;
  }
`

const TopContent = styled.div`
  flex-grow: 1;
`

const CardContainer = styled(Card)`
   border: 2px solid yellow;
   min-width: 272px;
   height: 235px;
   margin-top: 20px 0;
`;

const StyledCardActionArea = styled(CardActionArea)`
  && {
    border: 2px solid brown;
    min-width: 272px;
    min-height: 235px;
  }
`;

const SubHeading = styled.div`
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    line-height: 16px;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #76B649;
`;

const Heading = styled.div`
    &&&& {
      font-family: Lato;
      font-weight: 700;
      font-size: 18px;
      align: left;
      color: #000000;
}
`;

const StageText = styled.div`
      text-transform: uppercase;
      margin-bottom: 5px;
      font-size: 10px;
      line-height: 16px;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: rgba(0, 0, 0, 0.5);
`;

const TotalBudgetText = styled.div`
      text-transform: uppercase;
      font-size: 16px;
      line-height: 16px;
      font-size: 10px;
      color: #757575;
`;

  const LinearProgressDiv = styled.div`
      &&{
        height: 16px;
        background-color: red;
        margin-bottom: 5px;
      }
`;

const TotalAmount = styled.div`
      font-weight: bold;
      font-size: 16px;
`;

const TopContentTitle = styled.div`
      font-size: 14px;
      margin-top: 2px;
      line-height: 20px;
      font-style: regular;
      font-family: Lato;
`;

const ButtonLink = styled.a`
      text-decoration: none;
`;

const StyledButton = styled(Button)`
  && {
       min-width: 239px;
      height: 35px;
      // text-transform: lowercase;
       margin-top: 18px;
       margin-bottom: 18px;
    }
`;

const DownloadInfo = styled.div`
       font-size: 14px;
       text-align: center;
`;

const ctaIndex = Object.keys(callToActions);


const buildCta = index => {
  const {
    image,
    title,
    button,
    info,
    link,
  } = callToActions[index];

  return (
    <CardWrapper>
      <CardContainer>
          <CardHeading {...{ image }} />
          <GreenCardContent>
            <TopContent>
              <TopContentTitle>{title}</TopContentTitle>
            </TopContent>
            <ButtonLink href={link}>
              <StyledButton variant="contained">{button}</StyledButton>
            </ButtonLink>
            <DownloadInfo>{info}</DownloadInfo>
          </GreenCardContent>
      </CardContainer>
    </CardWrapper>
  )
}


const createProjectCard = (props, index) => {
  const {
    id,
    subheading,
    heading,
    stage,
    totalBudget,
    province
  } = props;

  return (
    <Fragment key={id}>
      {ctaIndex.indexOf(index.toString()) !== -1 && buildCta(index)}
      <CardWrapper>
        <Card>
          <StyledCardActionArea>
            <CardHeading>
              <MapPosition>
                <NationalMap size="small" active={province} />
              </MapPosition>
              <Tag {...{ province }}>{province === 'Multiple' ? 'MULTIPLE' : calcShorthand(province)}</Tag>
            </CardHeading>
            <StyledCardContent>
              <TopContent>
                <SubHeading>{subheading}</SubHeading>
                <Heading>{heading}</Heading>
              </TopContent>
              <div>
                <StageText>{`Stage: ${stage}`}</StageText>
                <LinearProgressDiv>
                  {calcProgress(stage) && <LinearProgress variant="determinate" value={calcProgress(stage)} />}
                </LinearProgressDiv>
                <TotalBudgetText>Total budget:</TotalBudgetText>
                <TotalAmount>{`R${trimValues(totalBudget)}`}</TotalAmount>
              </div>
            </StyledCardContent>
          </StyledCardActionArea>
        </Card>
      </CardWrapper>
    </Fragment>
  )
};


const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  margin-top: 160px;
  background: #EDEDED;
`

const Content = styled.div`
  position: relative;
  top: -130px;
  max-width: 1000px;
  margin: 0 auto;
`;

const ProjectList = ({ projects }) => {
  return (
    <Wrapper>
      <Content>
        <Typography>Project List</Typography>
        <List>
          {projects.map(createProjectCard)}
        </List>
      </Content>
    </Wrapper>
  )
}


export default ProjectList;
