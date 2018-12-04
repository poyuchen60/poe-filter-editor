import React from 'react';

import Chip from '@material-ui/core/Chip';

const TypeChip = (props) => {
  const { type, value, onDelete } = props;
  return <Chip
    label={`${value ? '' : 'Not '}${type}`}
    color={value ? 'primary' : 'secondary'}
    onDelete={onDelete}
  />
}

export default TypeChip;