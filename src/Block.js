import React, { Component } from 'react';
import './block.css';
import Item from './components/Item/Item'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';


class Block extends Component {

  shouldComponentUpdate(nextProps){
    const { active } = this.props;
    return active || nextProps.active;
  }

  render(){
    const {
      display, description,
      fontSize, borderColor, backgroundColor, textColor,
      active, modified,
      onRestore, onDelete, onFocus
    } = this.props;
    const className = display ? "顯示" : "隱藏";
    const color = display ? "primary" : "error";
    const primary = <Typography variant='subtitle1'>
      {description || "NoTitle"}
    </Typography>
    const secondary = <Typography variant='subtitle2' color={color}>
      {className}
    </Typography>
    return (
      <ListItem button style={{minHeight: '100px'}} onClick={onFocus} selected={active}>
        <Grid container xs={12} alignItems='center'>
          <Grid item xs={7}>
            <ListItemText 
              primary={primary}
              secondary={secondary}
              disableTypography={true}
            />
          </Grid>
          <Grid item xs={4} justify="center" container>
            <Item 
              textColor={textColor}
              borderColor={borderColor}
              backgroundColor={backgroundColor}
              fontSize={fontSize}
            />
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>

        <ListItemSecondaryAction style={{display:'flex', flexDirection: 'column'}}>
          <IconButton
            onClick={() => {onDelete();this.forceUpdate()}}
          ><DeleteIcon/></IconButton>
          <IconButton
            disabled={!modified}
            onClick={() => {onRestore();this.forceUpdate()}}
          ><RestoreIcon/></IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default Block;