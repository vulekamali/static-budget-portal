import React, { Component } from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import Icon from '../arrow-drop-down.svg';

import {
  CustomizedForm,
  FormControlCtrl,
  SelectPreview,
  ImageIcon
} from './styled';

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
