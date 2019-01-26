import React, { Component } from 'react';
import { conditions } from '../../data/Classified';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  constraint: {
    width: '105px'
  },
  operator: {
    width: '60px',
    marginLeft: '10px'
  },
  value: {
    width: '150px',
    marginLeft: '10px'
  },
  iconButton: {
    marginLeft: '10px'
  }
})

class ConstraintForm extends Component {
  constructor(props){
    super(props);
    const { constraint, body } = props;
    this.state = {
      constraint: constraint || '',
      operator: body ? body.operator : '',
      value: body ? body.value : '',
    }
  }

  handleChange = event => this.setState(
    {[event.target.name]: event.target.value, value: ''}
  );
  handleValueChange = event => this.setState({
    value: event.target.value,
  });
  handleSubmit = () => {
    const { onChange } = this.props;
    const { constraint, operator, value } = this.state;
    constraint
    && value
    && onChange(constraint)({value, operator: operator || '='})
  }
  handleClear = () => this.setState({
    constraint: '',
    operator: '',
    value: ''
  })

  render(){
    const { classes } = this.props;
    const { constraint, value, operator } = this.state;
    return <div className={classes.root}>
      <FormControl className={classes.constraint}>
        <InputLabel htmlFor="constraint">條件</InputLabel>
        <Select
          value={constraint}
          onChange={this.handleChange}
          inputProps={{
            name: 'constraint',
            id: 'constraint',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {conditions.Constraint.map( c => 
            <MenuItem value={c} key={c}>{c}</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.operator} disabled={!constraint}>
        <InputLabel htmlFor="operator">符號</InputLabel>
        <Select
          value={operator}
          onChange={this.handleChange}
          inputProps={{
            name: 'operator',
            id: 'operator',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="=">{'='}</MenuItem>
          <MenuItem value="<">{'<'}</MenuItem>
          <MenuItem value=">">{'>'}</MenuItem>
          <MenuItem value="<=">{'<='}</MenuItem>
          <MenuItem value=">=">{'>='}</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.value} disabled={!constraint}>
        <InputLabel htmlFor="value">數值</InputLabel>
        {constraint !== 'Rarity' 
        ? <Input
          id="value"
          value={value}
          onChange={this.handleValueChange}
          type="number"
        />
        : <Select
            value={value}
            onChange={this.handleValueChange}
            inputProps={{
              name: 'value',
              id: 'value',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Normal">{'Normal'}</MenuItem>
            <MenuItem value="Magic">{'Magic'}</MenuItem>
            <MenuItem value="Rare">{'Rare'}</MenuItem>
            <MenuItem value="Unique">{'Unique'}</MenuItem>
          </Select>
        }
      </FormControl>
      <FormControl className={classes.iconButton}>
        <IconButton 
          onClick={this.handleSubmit}
        ><DoneIcon /></IconButton>
      </FormControl>
      <FormControl className={classes.iconButton}>
        <IconButton
          onClick={this.handleClear}
        ><ClearIcon /></IconButton>
      </FormControl>
    </div>
  }
}

export default withStyles(styles)(ConstraintForm);