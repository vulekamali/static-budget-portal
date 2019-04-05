import React, { Component } from 'react';
import styled from 'styled-components';

import { FormControl, Select, MenuItem } from '@material-ui/core';

const CustomizedForm = styled.div`
  width: 50%;

  @media screen and (max-width: 675px) {
    width: 65%;
  }
`;

const FormControlDateCtrl = styled(FormControl)`
  ${'' /* Check if styling is taking on */}
  font-weight: 700;
  width: 94%;
`;

const SelectPreviewDate = styled(Select)`
  height: 65px;
  margin-top: 29px;
  margin-bottom: 15px;

  && {
    font-size: 20px;
    font-weight: 300;
    background: #d8d8d8;
    padding-left: 25px;
    border-radius: 2px;

    @media screen and (max-width: 675px) {
      font-size: 14px;
      height: 42px;
      padding-left: 15px;
      border-radius: 2px;
      margin-top: 2px;
    }
  }

  &::before {
    display: none;
  }
`;

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
              <MenuItem value="">None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </SelectPreviewDate>
          </FormControlDateCtrl>
        </form>
      </CustomizedForm>
    );
  }
}

export default CustomizedDateSelect;
