import React from 'react';
import styled from 'styled-components';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Typography } from '@material-ui/core'
import { darken } from 'polished';
import Modal from './Modal';
import Icon from './Icon';

const StyledSpeedDial = styled(SpeedDial)`
  height: 20px;
  align-self: flex-start;
  padding-top: 12px;
  margin-right: 4px;
  margin-left: 4px;

  & .fab {
    background: #C4C4C4;
    width: 36px;
    margin-left: 10px;

    &:hover {
      background: ${darken(0.1, '#C4C4C4')};
    }
  }
`;

const WhiteButton = styled(Button)`
  &&& {
    background: white;
    border-radius: 50px;
    ${({ text }) => (!!text ? 'min-width: 96px' : 'min-width: 36px')};
    ${({ text }) => (!!text ? '' : 'width: 36px')};
    ${({ text }) => (!!text ? 'height: 36px' : 'height: 36px')};
    color: black;
    text-transform: none;
    font-family: Lato;
    font-size: 16px;
    font-weight: 700;
    box-shadow: none;
    opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
    margin-right: 4px;
    margin-left: 4px;
    ${({ text }) => (!!text ? 'padding-top: 4px ' : '')};
    ${({ text }) => (!!text ? 'padding-right: 25px' : '')};
    
    &:hover {
      background: ${darken(0.1, 'white')};
    }
  }
`;

const TwoArrowButtons = styled.div`
  display: flex;
`;

const PositionedShareIcon = styled(ShareIcon)`
  position: relative;
  right: 2px;
  color: #3f3f3f;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: #3f3f3f;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #EDEDED;

    @media screen and (min-width: 450px) {
      position: static;
      top: 0;
      background-color: transparent;
    }

    @media screen and (min-width: 650px) {
    }
`;

const WhiteText = styled(Typography)`
  text-transform: uppercase;
  max-width: 272px;
  text-align: center;

  && {
    color: #3F3F3F;
    font-family: Lato;
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 3px;

    @media screen and (min-width: 450px) {
      color: #fff;
      max-width: none;
      line-height: normal;
      font-weight: 400;
      font-size: 14px;
    }
  }
`
const Wrapper = styled.div`
  position: relative;
  background: #3f3f3f;
  display: flex;
  width: 100%;
  height: 60px;
  margin-bottom: 80px;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
`;

const createNewTab = (newUrl) => {
  const { focus } = window.open(newUrl, '_blank');
  return focus();
};

const sharing = [
  'Copy link',
  'Share on Facebook',
  'Share on Twitter',
  'Share on Linkedin',
];


const getUrl = (baseUrl, title) => {
  switch (title) {
    case 'Copy link': return `baseUrl`;
    case 'Share on Facebook': return `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}`;
    case 'Share on Twitter': return `https://twitter.com/home?status=${baseUrl}`;
    case 'Share on Linkedin': return `https://www.linkedin.com/shareArticle?url=${baseUrl}`;
    default: return null;
  };
};

const createObjects = (baseUrl, toggleModal, toggleSharingOpen) => (title) => {
  if (title === 'Copy link') {
    return {
      title,
      icon: <Icon {...{ title }} />,
      action: () => {
        toggleSharingOpen();
        toggleModal(baseUrl)
      }
    }
  }

  return {
    title,
    icon: <Icon {...{ title }} />,
    action: () => {
      toggleSharingOpen();
      createNewTab(getUrl(baseUrl, title))
    },
  }
};

const creataShareLink = ({ title, icon, action }) => (
  <SpeedDialAction
    key={title}
    icon={icon}
    tooltipTitle={title}
    onClick={action}
  />
)

const createButtons = (id, toggleModal, toggleSharingOpen) => {
  const baseUrl = id ? `${window.location.href}?id=${id}` : window.location.href;
  const buttonsInfo = sharing.map(createObjects(baseUrl, toggleModal, toggleSharingOpen))

  return buttonsInfo.map(creataShareLink);
};

const createSpeedDial = (sharingOpen, toggleSharingOpen, id, toggleModal) => {
  return (
    <StyledSpeedDial
      ariaLabel="SpeedDial openIcon example"
      icon={!!sharingOpen ? <StyledCloseIcon /> : <PositionedShareIcon />}
      onClick={toggleSharingOpen}
      open={!!sharingOpen}
      direction="down"
      classes={{ fab: 'fab' }}
    >
      {createButtons(id, toggleModal, toggleSharingOpen)}
    </StyledSpeedDial>
  )
}

const buttonMarkup = (disabled, text, reverse, clickEvent) => (
  <WhiteButton variant="contained" {...{ disabled, text }} onClick={clickEvent}>
    {reverse ? <LeftIcon /> : <RightIcon />}
    {!!text && <span>{text}</span>}
  </WhiteButton>
);

const Markup = (props) => {
  const { 
    sharingOpen,
    modal,
    toggleSharingOpen,
    toggleModal,
    amount,
    id,
    details,
    previousId,
    nextId,
  } = props;

  return (
    <Wrapper>
      <Modal open={!!modal} closeModal={() => toggleModal(null)} url={modal} />
      {!!details && buttonMarkup(false, 'Back', true)}
      {createSpeedDial(sharingOpen, toggleSharingOpen, id, toggleModal)}
      <TextContainer>
        <WhiteText>{`${amount} national department infrastructure projects`}</WhiteText>
      </TextContainer>
      <TwoArrowButtons>
        {buttonMarkup(id <= 0, null, true, previousId)}
        {buttonMarkup(id + 1 >= amount, null, null, nextId)}
      </TwoArrowButtons>
    </Wrapper>
  )
}

export default Markup;
