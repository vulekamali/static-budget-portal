import React, { Component } from 'react';
import { MenuItem, CssBaseline } from '@material-ui/core';

import {
  CustomizedForm,
  SelectPreview
} from './styled';


const callMenuItems = ({ id, name }) => (
  <MenuItem value={id}>{name}</MenuItem>
);

class CustomizedSelect extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      budgetValue: ''
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { items, selected, eventHandler } = this.props;
    return (
      <CustomizedForm>
        <CssBaseline />
        <SelectPreview
          value={selected}
          onChange={eventHandler}
          displayEmpty
          name={this.state.budgetValue}
          classes={{ icon: 'icon', selectMenu: 'selectMenu'}}
        >
        {items.map(callMenuItems)}
        </SelectPreview>
      </CustomizedForm>
    );
  }
}

export default CustomizedSelect;
