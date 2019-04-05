import React, { Component } from 'react';
import MenuItem from "@material-ui/core/MenuItem";

import {
  CustomizedForm,
  SelectPreview
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
        <SelectPreview
          value={this.state.budgetValue}
          onChange={this.handleChange}
          displayEmpty
          name="budgetValue"
          classes={{ icon: 'icon', selectMenu: 'selectMenu'}}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectPreview>
      </CustomizedForm>
    );
  }
}

export default CustomizedSelect;
