import React from 'react';
import Chip from '@material-ui/core/Chip';


const ConstraintChip = props => {
  const {
    constraint, body: { operator, value},
    onDelete, onClick
  } = props;
  return <Chip
    label={`${constraint} ${operator} ${value}`}
    onDelete={onDelete}
    onClick={(event) => {
      event.stopPropagation();
      onClick();
    }}
  />
}

export default ConstraintChip;