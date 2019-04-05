import React, { Component } from 'react';
import { MenuItem, CssBaseline } from '@material-ui/core';

import {
  CustomizedForm,
  SelectPreview
} from './styled';


const callMenuItems = ({ id, name }) => (
  <MenuItem value={id}>{name}</MenuItem>
);

class CustomizedSelect extends Component{

  state = {
    budgetValue: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { departments } = this.props;
    return (
      <CustomizedForm>
        <CssBaseline />
        <SelectPreview
          value={this.state.budgetValue}
          onChange={this.handleChange}
          displayEmpty
          name="budgetValue"
          classes={{ icon: 'icon', selectMenu: 'selectMenu'}}
        >
        {departments.map(callMenuItems)}
          <MenuItem value="">Something suuuuper loooooong! Not long enough man</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectPreview>
      </CustomizedForm>
    );
  }
}

export default CustomizedSelect;
