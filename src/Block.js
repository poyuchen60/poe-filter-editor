import React from 'react';
import './block.css';
import Item from './components/Item/Item'
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Typography,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';


class Block extends React.Component {


  render(){
    const {focus, block, active, tainted, onRestore, onDelete} = this.props;
    const className = block.get("display") ? "顯示" : "隱藏";
    const color = block.get("display") ? "primary" : "error";
    const itemProperties = 
      ["SetTextColor", "SetBorderColor", "SetBackgroundColor", "SetFontSize"].map( p => {
        return block.has(p) ? block.get(p).toObject() : undefined;
      });
    const primary = <Typography variant='subtitle1'>
      {block.get("description") || "NoTitle"}
    </Typography>
    const secondary = <Typography variant='subtitle2' color={color}>
      {className}
    </Typography>
    return (
      <ListItem button style={{minHeight: '100px'}} onClick={focus} selected={active}>
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
              textColor={itemProperties[0]}
              borderColor={itemProperties[1]}
              backgroundColor={itemProperties[2]}
              fontSize={itemProperties[3]}
            />
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>

        <ListItemSecondaryAction style={{display:'flex', flexDirection: 'column'}}>
          <IconButton
            onClick={onDelete}
          ><DeleteIcon/></IconButton>
          <IconButton
            disabled={!tainted}
            onClick={onRestore}
          ><RestoreIcon/></IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default Block;