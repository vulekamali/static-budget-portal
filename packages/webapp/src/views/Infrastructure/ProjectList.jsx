import React, { Fragment } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import NationalMap from '../../components/NationalMap';
import trimValues from '../../helpers/trimValues';
import manAtLaptopImg from './man-at-laptop.jpg';
import Progressbar from '../../components/Progressbar';
import Icon from '@material-ui/icons/ArrowDownward';



const calcShorthand = (name) => {
  switch (name) {
    case 'Eastern Cape': return 'EC';
    case 'Freestate': return 'FS';
    case 'Gauteng': return 'GP';
    case 'Kwazulu Natal': return 'KZN';
    case 'Limpopo': return 'LIM';
    case 'Mpumalanga': return 'MP';
    case 'Northern Cape': return 'NC';
    case 'North West Province': return 'NW';
    case 'Western Cape': return 'WC';
    default: return null;
  }
}


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
};

const CardWrapper = styled.div`
  width: 272px;
  height: 235px;
  margin: 16px 16px 0px;
  
  @media screen and (min-width: 1028px) {
    width: 226px;
    height: 286px;
    margin: 12px;
    
    &&:first-child{
      margin-left: 0;
    }
    
    &&:nth-child(4) {
      margin-right: 0;
    }
    
    &&:nth-child(4n + 1) {
      margin-left: 0;
    }
  }
`;

const StyledCardActionArea = styled(CardActionArea)`
  && {
    height: 100%;
  }
`;

const CardContainer = styled(Card)`
   && {
     height: 100%;
   }
`;

const CardHeading = styled.div`
  background-color: #F4F4F4;
  width: 100%;
  height: 64px;
  position: relative;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  background-image: ${({ image }) => (image ? `url('${image}')` : 'none')};
  background-size: cover;
  background-position: center center;
  @media screen and (min-width: 1028px) {
    height: 85px;
  }
`;

const StyledCardContent = styled(CardContent)`
  && {
    padding: 30px 15px 15px;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 4px 4px;
    height: 171px;
    
    @media screen and (min-width: 1028px) {
      height: 201px;
      justify-content: space-between;
    }   
  }
`;

const GreenCardContent = styled(StyledCardContent)`
  && {
    background: #76B649;
    color: white;
    padding: 15px;
  }
`;

const TopContent = styled.div`
`;

const TopContentTitle = styled.div`
    font-size: 14px;
    margin-top: 2px;
    line-height: 20px;
    font-weight: normal;
    // font-family: Lato;
    @media screen and (min-width: 1028px) {
      font-size: 16px;
    }
`;

const ButtonLink = styled.a`
      text-decoration: none;
`;

const StyledButton = styled(Button)`
  && {
    display: flex;
    width: 239px;
    justify-content: center;
    height: 40px;
    text-transform: none;
    margin-top: 24px;
    margin-bottom: 8px;
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: none;
  }

  @media screen and (min-width: 1028px) {
    && {
      display: flex;
      justify-content: space-between;
      width: 193px;
      height: 40px;
      margin-top: 40px;
    }
`;

const DownloadInfo = styled.div`
   color: rgba(255, 255, 255, 0.7);
   font-size: 10px;
   text-align: center;
   font-weight: bold;
   font-family: Lato;
`;

const MapPosition = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
`;

const Tag = styled.div`
  color: white;
  background-color: #000000;
  width: ${({ province }) => (province === 'Multiple' ? '80px' : '40px')};
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
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
      font-size: 16px;
      align: left;
      color: #000000;
      @media screen and (min-width: 1028px) {
        font-size: 18px;
      }
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
      margin-top: 15px;
`;
const TotalAmount = styled.div`
      font-weight: bold;
      font-size: 16px;
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
          <CssBaseline />
            <TopContent>
              <TopContentTitle>{title}</TopContentTitle>
            </TopContent>
            <ButtonLink href={link}>
              <StyledButton variant="contained">
                {button}
                <Icon />
              </StyledButton>
            </ButtonLink>
            <DownloadInfo>{info}</DownloadInfo>
          </GreenCardContent>
      </CardContainer>
    </CardWrapper>
  )
};

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
        <CardContainer>
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
                <Progressbar stage={stage} />
                <TotalBudgetText>Total budget:</TotalBudgetText>
                <TotalAmount>{`R${trimValues(totalBudget)}`}</TotalAmount>
              </div>
            </StyledCardContent>
          </StyledCardActionArea>
        </CardContainer>
      </CardWrapper>
    </Fragment>
  )
};

const Wrapper = styled.div`
  margin-top: 160px;
  background: #EDEDED;
`;

const Content = styled.div`
  position: relative;
  top: -130px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
   font-family: Lato;
   font-size: 14px;
   text-transform: uppercase;
   padding: 0 16px;
   @media screen and (min-width: 1028px) {
    padding: 0;
   }
`;

const List = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  @media screen and (min-width: 912px) {
    justify-content: flex-start;
  }
`;

const ProjectList = ({ projects }) => {
  return (
    <Wrapper>
      <Content>
        <Title>Project List</Title>
        <List>
          {projects.map(createProjectCard)}
        </List>
      </Content>
    </Wrapper>
  )
};


export default ProjectList;
