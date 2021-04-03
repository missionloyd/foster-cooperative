import React from 'react'
import { InputBase } from '@material-ui/core';

const SearchBar = props => {
  return (
      <InputBase
      onInput={props.onInput}
      classes={props.classes}
      placeholder="Search communities, resources, and more..."
      fullWidth={true}
      color="primary"
      />
  );
}

export default SearchBar;