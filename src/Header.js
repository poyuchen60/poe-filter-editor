import React from 'react';
import { AppBar, Toolbar, Typography, Input, Button } from '@material-ui/core';


const Header = (props) => {
  const { onFileChange, onSubmit } = props;
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
      </Toolbar>
    </AppBar>
  )
}

export default Header;