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
  handleFocus = () => {
    this.props.onFocus();
  }
  handleDelete = () => {
    this.props.onDelete();
    this.forceUpdate();
  }
  handleRestore = () => {
    this.props.onRestore();
    this.forceUpdate();
  }

  render(){
    const {
      display, description,
      fontSize, borderColor, backgroundColor, textColor,
      active, modified
    } = this.props;
    const {
      handleRestore, handleFocus, handleDelete
    } = this;
    const className = display ? "顯示" : "隱藏";
    const color = display ? "primary" : "error";
    const primary = ({
      variant: 'subtitle1'
    });
    const secondary = ({
      variant: 'subtitle2',
      color
    });
    return (
      <ListItem
        button style={{minHeight: '100px'}}
        onClick={handleFocus}
        selected={active}
      >
        <Grid container alignItems='center'>
          <Grid item xs={7}>
            <ListItemText 
              primary={description || "NoTitle"}
              secondary={className}
              primaryTypographyProps={primary}
              secondaryTypographyProps={secondary}
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
            onClick={handleDelete}
          ><DeleteIcon/></IconButton>
          <IconButton
            disabled={!modified}
            onClick={handleRestore}
          ><RestoreIcon/></IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default Block;