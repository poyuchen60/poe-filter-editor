import React from 'react';
import Chip from '@material-ui/core/Chip';

const SocketsChip = (props) => {
  const { setting, onDelete } = props;
  if(setting){
    const { operator, value } = setting;
    return <Chip
      label={`插槽數量 ${operator} ${value}`}
      onDelete={onDelete}
    />
  }
  return null;
}

const LinkedSocketsChip = (props) => {
  const { setting, onDelete } = props;
  if(setting){
    const { operator, value } = setting;
    return <Chip
      label={`最大連線 ${operator} ${value}`}
      onDelete={onDelete}
    />
  }
  return null;
}

const SocketGroupChip = (props) => {
  const { setting, onDelete } = props;
  if(setting){
    const { value } = setting;
    return <Chip
      label={`連線組合: ${value}`}
      onDelete={onDelete}
    />
  }
  return null;
}

export { SocketsChip, LinkedSocketsChip, SocketGroupChip };