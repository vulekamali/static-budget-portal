// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import Icon from './Icon';

const StyledSpeedDial = styled(SpeedDial)`
  height: 40px;
  align-self: flex-start;
  /* margin-right: 4px; */

  & .fab {
    background: #C4C4C4;
    width: 36px;
    margin-left: 10px;

    &:hover {
      background: ${darken(0.1, '#C4C4C4')};
    }
  }
`;

const PositionedShareIcon = styled(ShareIcon)`
  /* position: relative;
  right: 2px; */
  color: #3f3f3f;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: #3f3f3f;
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
    case 'Share on Linkedin': return `https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}`;
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

const Markup = ({ sharingOpen, toggleSharingOpen, id, toggleModal }) => {
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
  );
}

export default Markup;
