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

  & .fab {
    background: #C4C4C4;
    width: 36px;

    &:hover {
      background: ${darken(0.1, '#C4C4C4')};
    }
  }
`;


const WhiteButton = styled(Button)`
  &&& {
    background: white;
    border-radius: 50px;
    ${({ text }) => (!!text ? '' : 'min-width: 16px')};
    ${({ text }) => (!!text ? '' : 'width: 16px')};
    ${({ text }) => (!!text ? '' : 'height: 32px')};
    color: black;
    text-transform: none;
    font-family: Lato;
    font-size: 16px;
    font-weight: 700;
    box-shadow: none;
    opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
    margin-right: 4px;
    margin-left: 4px;

    &:hover {
      background: ${darken(0.1, 'white')};
    }
  }
`;

const TwoArrowButtons = styled.div`
  display: flex;
`;


const WhiteText = styled(Typography)`
  border: 1px solid blue;
  position: absolute;
  max-width: 200px;
  top: 75px;
  left: calc(50% - 100px);
  text-align: center;
  && {
    color: #3F3F3F;
  }
`

const Wrapper = styled.div`
  position: relative;
  background: #3f3f3f;
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
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
      <WhiteText>{`${amount} national department infrastructure projects`}</WhiteText>
      <TwoArrowButtons>
        {buttonMarkup(id <= 0, null, true, previousId)}
        {buttonMarkup(id + 1 >= amount, null, null, nextId)}
      </TwoArrowButtons>
    </Wrapper>
  )
}


export default Markup;