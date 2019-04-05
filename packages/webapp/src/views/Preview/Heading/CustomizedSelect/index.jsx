import React, { Component } from 'react';
import styled from 'styled-components';

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from '../arrow-drop-down.svg';

const CustomizedForm = styled.div`
  width: 50%;

  @media screen and (max-width: 675px) {
    width: 65%;
  }
`;

const FormControlCtrl = styled(FormControl)`
  font-weight: 700;
  width: 70%;
  @media screen and (max-width: 675px) {
    width: 100%;
  }
`;


const SelectPreview = styled(Select)`
  background: #fff;
  height: 65px;
  margin-top: 29px;
  margin-bottom: 15px;

  && {
    font-size: 24px;
    background: white;
    padding-left: 20px;

    @media screen and (max-width: 675px) {
      margin-top: 10px;
      height: 42px;
      font-size: 14px;
      padding-left: 15px;
    }
  }

  &::before {
    display: none;
  }
`;


const ImageIcon = styled.img`
    position: absolute;
    background: #d7d7d7;
    bottom: -12px;
    right: 0;
    height: 7px;
    padding: 29px;
    cursor: pointer;
    pointer-events: none;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    @media screen and (max-width: 675px) {
      bottom: -6px;
      height: 4px;
      padding: 19px;
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
      <CustomizedForm>
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
              <MenuItem value="">None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </SelectPreview>
          </FormControlCtrl>
        </form>
      </CustomizedForm>
    );
  }
}

export default CustomizedSelect;
