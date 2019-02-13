import React from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import Button from '@material-ui/core/Button';
import { darken } from 'polished';


const PrimaryButton = styled(Button)`
  && {
    background: #79B443;
    border-radius: 50px;
    color: white;
    text-transform: none;

    &:hover {
      background: ${darken(0.1, '#79B443')};
    }
  }
`;


const SecondaryButton = styled(PrimaryButton)`
  && {
    background: #161616;

    &:hover {
      background: ${darken(0.1, 'grey')};
    }
  }
`;


const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 650px) {
    flex-direction: row;
  }
`;


const LinkWrapper = styled.a`
  display: inline-block;
  padding: 20px;
  text-decoration: none;
`;


const Buttons = ({ primary, secondary }) => (
  <ButtonsWrapper>
    <LinkWrapper href={primary.link}>
      <PrimaryButton variant="contained">{primary.text}</PrimaryButton>
    </LinkWrapper>
    <LinkWrapper href={secondary.link}>
      <SecondaryButton variant="contained">{secondary.text}</SecondaryButton>
    </LinkWrapper>
  </ButtonsWrapper>
);


export default Buttons;


Buttons.propTypes = {
  primary: t.shape({
    text: t.string,
    link: t.string,
  }).isRequired,
  secondary: t.shape({
    text: t.string,
    link: t.string,
  }).isRequired,
};
