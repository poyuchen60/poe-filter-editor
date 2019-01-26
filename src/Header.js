import React from 'react';
import { AppBar, Toolbar, Typography, Input, Button } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';


const Header = (props) => {
  const { onFileChange, onSubmit, onCreateBlock } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          POE Filter Editor
        </Typography>
        <Input type="file" onChange={onFileChange} style={{color: 'white'}}/>
        <Button
          onClick={onSubmit}
          color="secondary"
          variant="contained"
        >Parse</Button>
        <IconButton color="inherit" onClick={onCreateBlock}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header;