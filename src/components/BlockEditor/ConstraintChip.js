import React from 'react';
import Chip from '@material-ui/core/Chip';


const ConstraintChip = props => {
  const { constraint, body: { operator, value}, onDelete } = props;
  return <Chip
    label={`${constraint} ${operator} ${value}`}
    onDelete={onDelete}
  />
}

export default ConstraintChip;