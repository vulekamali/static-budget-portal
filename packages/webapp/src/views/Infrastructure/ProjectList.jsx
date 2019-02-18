import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import NationalMap from '../../components/NationalMap';
import trimValues from '../../helpers/trimValues';
import manAtLaptopImg from './man-at-laptop.jpg';
import Progressbar from '../../components/Progressbar';


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
  width: 25%;
  padding: 10px;
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
  height: 210px;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 4px 4px;
}
`

const GreenCardContent = styled(StyledCardContent)`
  && {
    background: #76B649;
    color: white;
  }
`

const TopContent = styled.div`
  flex-grow: 1;
`

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
      <Card>
          <CardHeading {...{ image }} />
          <GreenCardContent>
            <TopContent>
              <div>{title}</div>
            </TopContent>
            <a href={link}>
              <Button variant="contained">{button}</Button>
            </a>
            <div>{info}</div>
          </GreenCardContent>
      </Card>
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
          <CardActionArea>
            <CardHeading>
              <MapPosition>
                <NationalMap size="small" active={province} />
              </MapPosition>
              <Tag {...{ province }}>{province === 'Multiple' ? 'MULTIPLE' : calcShorthand(province)}</Tag>
            </CardHeading>
            <StyledCardContent>
              <TopContent>
                <div>{subheading}</div>
                <div>{heading}</div>
              </TopContent>
              <div>
                <div>{`Stage: ${stage}`}</div>
                  <Progressbar stage={stage} />
                <div>Total budget:</div>
                <div>{`R${trimValues(totalBudget)}`}</div>
              </div>
            </StyledCardContent>
          </CardActionArea>
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
