import React, { Component, Fragment } from 'react';
import Block from './Block';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';

const BlockList = props => {
  const {
    blocks,
    focus, onBlockRestore, onBlockDelete, onDownload
  } = props;
  return (
    <div>
    <List>
      <ListItem button onClick={onDownload}>
        <ListItemIcon>
          <SaveIcon />
        </ListItemIcon>
        <ListItemText primary="儲存" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <RestoreIcon />
        </ListItemIcon>
        <ListItemText primary="回復" />
      </ListItem>
      <Divider />
      {blocks && blocks.map( b => {
        const { modified, active, block, id, index } = b;
        const {
          SetTextColor, SetBackgroundColor, SetBorderColor, SetFontSize,
          display, description
        } = block;
        return (
          <Block
            modified={modified}
            active={active}
            textColor={SetTextColor}
            borderColor={SetBorderColor}
            backgroundColor={SetBackgroundColor}
            fontSize={SetFontSize}
            display={display}
            description={description}
            key={id}
            onFocus={focus(index)}
            onRestore={() => onBlockRestore(id)}
            onDelete={() => onBlockDelete(id)}
          />
        )
      })}
    </List>
    </div>
  )
}

export default BlockList;