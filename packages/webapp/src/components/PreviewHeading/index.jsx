import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from './arrow-drop-down.svg';
import Arrow from './Arrow.svg';

const Title = styled(Typography)`
  && {
    font-family: Roboto;
    font-weight: bold;
    letter-spacing: 0.01rem;
  }
`;

const HeadingWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: #F7F7F7;

  @media screen and (min-width: 600px) {
    max-width: 100%;
  }
`;

const HeadingContentWrapper = styled.div`
  &&&& {
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 675px) {
      width: auto;
      display: flex;
      flex-direction: column;
    }
  }
`;

const HeadingText = styled.div`
  &&&& {
    line-height: 23px;
    font-size: 16px;
    width: 60%;
    @media screen and (max-width: 675px){
      display: block;
      width: 100%;
    }
  }
`;

const TitleBlack = styled(Title)`
  && {
    color: #000;
    font-size: 48px;
    padding-top: 30px;
    @media screen and (max-width: 675px){
      font-size: 32px;
    }
  }
`;


const RightColumn = styled.div`
  margin-top: 99px;
  width: 40%;
  display: flex;
  @media screen and (max-width: 675px){
    width: 100%;
    margin-top: 0;
  }
`;

const FormControlCtrl = styled(FormControl)`
  font-weight: bold;
  width: 70%;
  @media screen and (max-width: 675px){
    width: 100%;
  }
`;

const FormControlDateCtrl = styled(FormControl)`
  font-weight: bold;
  width: 94%;
`;


const SelectPreview = styled(Select)`
  background: #fff;
  height: 65px;
  margin-top: 29px;
  margin-bottom: 15px;
  &&{
    font-size: 24px;
    background: white;
    padding-left: 20px;
    @media screen and (max-width: 675px){
      margin-top: 10px;
      height: 42px;
      font-size: 14px;
      padding-left: 15px;
    }
  }
  &::before{
    display:none;
  }
`;

const SelectPreviewDate = styled(Select)`
  height: 65px;
  margin-top: 29px;
  margin-bottom: 15px;
  &&{
    font-size: 20px;
    background: white;
    font-weight: 300;
    background: #D8D8D8;
    padding-left: 25px;
    border-radius: 2px;
    @media screen and (max-width:675px){
      font-size: 14px;
      padding-left: 25px;
      margin-top: 10px;
      height: 42px;
      padding-left: 15px;
      border-radius: 2px;
      margin-top:  2px;
    }
  }
  &::before{
    display:none;
  }
`;

const ImageIcon = styled.img`
    position: absolute;
    background: #D7D7D7;
    bottom: -12px;
    right: 0px;
    height: 7px;
    padding: 29px;
    cursor: pointer;
    pointer-events: none;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    @media screen and (max-width: 675px){
      bottom: -6px;
      right: 0px;
      height: 4px;
      padding: 19px;
    }
`;

const MenuI = styled(MenuItem)`

`;

const ButtonDetails = styled(Button)`
  &&{
    display: block;
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    background: black;
    color: white;
    width: 62%;
    height: 64px;
    line-height: 22px;
    margin-top: 29px;
    border-radius: 0;
    text-transform: capitalize;
    letter-spacing: 0.01em;
    padding-left: 25px;
    border-radius: 2px;
    @media screen and (max-width: 675px){
      font-size: 14px;
      margin-top: 10px;
      height: 42px;
      padding-left: 15px;
      line-height: 13px;
      margin-top: 2px;
    }
  }
`;

const CustomizedForm = styled.div`
  width: 50%;
  @media screen and (max-width: 675px){
    width: 65%;
  }
`;

const ArrowImage = styled.img`
  position: absolute;
  right: 25px;
  top: 24px;
  @media screen and (max-width: 675px){
    position: absolute;
    right: 15px;
    top: 15px;
    height: 12px;
  }
`;


class CustomizedSelect extends Component{

  state = {
    budgetValue: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form autoComplete="off">
        <FormControlCtrl>
          <SelectPreview
            value={this.state.budgetValue}
            onChange={this.handleChange}
            displayEmpty
            name="budgetValue"
            IconComponent={() => (
              <ImageIcon src={Icon} alt="Logo" />
            )}
          >
            <MenuI value="">None</MenuI>
            <MenuI value={10}>Ten</MenuI>
            <MenuI value={20}>Twenty</MenuI>
            <MenuI value={30}>Thirty</MenuI>
          </SelectPreview>
        </FormControlCtrl>
      </form>
    );
  }
}

class CustomizedDateSelect extends Component{

  state = {
    DateValue: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <CustomizedForm>
        <form autoComplete="off">
          <FormControlDateCtrl>
            <SelectPreviewDate
              value={this.state.DateValue}
              onChange={this.handleChange}
              displayEmpty
              name="DateValue"
            >
              <MenuI value="">None</MenuI>
              <MenuI value={10}>Ten</MenuI>
              <MenuI value={20}>Twenty</MenuI>
              <MenuI value={30}>Thirty</MenuI>
            </SelectPreviewDate>
          </FormControlDateCtrl>
        </form>
      </CustomizedForm>
    );
  }
}



const PreviewHeading = () => {

  return (
    <HeadingWrapper>
      <HeadingContentWrapper>
        <HeadingText>
          <TitleBlack>
            National Budget
          </TitleBlack>
          <CustomizedSelect />
        </HeadingText>
        <RightColumn>
        <CustomizedDateSelect />
        <ButtonDetails>
          Detailed analysis
          <ArrowImage src={Arrow} alt="Arrow"></ArrowImage>
        </ButtonDetails>
        </RightColumn>
      </HeadingContentWrapper>
    </HeadingWrapper>
  )
};


export default PreviewHeading;
