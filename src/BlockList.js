import React, { Component, Fragment } from 'react';
import Block from './Block';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon
} from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';

class BlockList extends Component {

  render(){
    const {blocks, tainted, focusOn} = this.props;
    const {focus, onBlockRestore, onBlockDelete } = this.props;
    return (
      <List>
        <ListItem button>
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
        {blocks && blocks.map( (block, index) => {
          const t = tainted.get(index)
          return (
            <Block
              tainted={Boolean(t)}
              active={index === focusOn}
              block={t || block}
              key={index}
              focus={focus(index)}
              onRestore={() => onBlockRestore(index)}
              onDelete={() => onBlockDelete(index)}
            />
          )
        })}
      </List>
      // <Fragment>
      //   <Button variant="outlined" color="primary" onClick={onSaveAllBlocks}>儲存</Button>
      //   <Button variant="outlined" color="secondary" onClick={onDiscardAllBlockChanges}>捨棄修改</Button>
      //   <ul>
      //     {blocks.map( (block, index) => {
      //       const t = tainted.get(index)
      //       return (
      //         <Block
      //           tainted={Boolean(t)}
      //           active={index === focusOn}
      //           block={t || block}
      //           key={index}
      //           focus={focus(index)}
      //         />
      //       )
      //     })}
      //   </ul>
      // </Fragment>
    )
  }


}

export default BlockList;