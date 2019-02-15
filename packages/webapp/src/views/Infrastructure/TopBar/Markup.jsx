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
  height: 400px;
`;


const WhiteButton = styled(Button)`
  &&& {
    background: white;
    border-radius: 50px;
    color: black;
    text-transform: none;
    padding: 10px 25px;
    font-family: Lato;
    font-size: 16px;
    font-weight: 700;
    box-shadow: none;
    opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};

    &:hover {
      background: ${darken(0.1, 'white')};
    }
  }
`;


const WhiteText = styled(Typography)`
  && {
    color: white;
  }
`

const Wrapper = styled.div`
  background: #3f3f3f;
  display: flex;
  width: 100%;
  height: 60px;
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


const PositionedShareIcon = styled(ShareIcon)`
  position: relative;
  right: 2px;
`


const createSpeedDial = (sharingOpen, toggleSharingOpen, id, toggleModal) => {
  return (
    <StyledSpeedDial
      ariaLabel="SpeedDial openIcon example"
      icon={!!sharingOpen ? <CloseIcon /> : <PositionedShareIcon />}
      onClick={toggleSharingOpen}
      open={!!sharingOpen}
      direction="down"
    >
      {createButtons(id, toggleModal, toggleSharingOpen)}
    </StyledSpeedDial>
  )
}


const buttonMarkup = (disabled, text, reverse, clickEvent) => (
  <WhiteButton variant="contained" {...{ disabled }} onClick={clickEvent}>
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
      <WhiteText>{`${amount} national department infrastructure projects`}</WhiteText>
      {buttonMarkup(id <= 0, null, true, previousId)}
      {buttonMarkup(id + 1 >= amount, null, null, nextId)}
    </Wrapper>
  )
}


export default Markup;