import React from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import { PrimaryButton, SecondaryButton } from './styled';


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
  padding: 7px;
  text-decoration: none;

  @media screen and (min-width: 650px) {
    padding: 8px;
  }
`;


const generateLinkProps = link => {
  if (!link) {
    return {};
  }

  return {
    href: link,
    target: '_blank',
    rel: 'noopener noreferrer'
  }
}

const Buttons = ({ primary, secondary }) => (
  <ButtonsWrapper>
    <LinkWrapper {...generateLinkProps(primary.link)}>
      <PrimaryButton variant="contained" onClick={primary.clickEvent}>{primary.text}</PrimaryButton>
    </LinkWrapper>
    <LinkWrapper {...generateLinkProps(secondary.link)}>
      <SecondaryButton variant="contained">{secondary.text}</SecondaryButton>
    </LinkWrapper>
  </ButtonsWrapper>
);


export default Buttons;


Buttons.propTypes = {
  primary: t.shape({
    text: t.string,
    link: t.string,
    clickEvent: t.func,
  }).isRequired,
  secondary: t.shape({
    text: t.string,
    link: t.string,
    clickEvent: t.func,
  }).isRequired,
};
