import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = (theme) => ({
  formControl: {
    margin: "5px",
    minWidth: 60,
  },
})

const defaultValue = {
  operator: "=",
  value: 6
}

class SocketsAndLinksEditor extends Component {

  shouldComponentUpdate = (nextProps) => {
    const { setting } = this.props;
    return setting || nextProps.setting || false;
  }

  handleCheckboxChange = (event) => {
    const { onChange } = this.props;
    const checked = event.target.checked;
    onChange(checked ? defaultValue : undefined)
  }
  handleSelectChange = (event) => {
    const { setting, onChange } = this.props;
    onChange({
      ...setting,
      [event.target.name]: event.target.value
    })
  }

  render(){
    const { classes, setting, name } = this.props;
    const isSet = setting ? true : false;
    const { operator, value } = (setting || defaultValue);
    const { handleCheckboxChange, handleSelectChange } = this;
    return <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={isSet}
            onChange={handleCheckboxChange}
          />
        }
        label={name}
      />
      <FormControl className={classes.formControl} disabled={!isSet}>
        <InputLabel shrink htmlFor="operator">
          符號
        </InputLabel>
        <Select
          value={operator}
          onChange={handleSelectChange}
          input={<Input name="operator" id="operator" />}
          name="operator"
          className={classes.selectEmpty}
        >
          <MenuItem value={"="}>{"="}</MenuItem>
          <MenuItem value={">"}>{">"}</MenuItem>
          <MenuItem value={"<"}>{"<"}</MenuItem>
          <MenuItem value={">="}>{">="}</MenuItem>
          <MenuItem value={"<="}>{"<="}</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} disabled={!isSet}>
        <InputLabel shrink htmlFor="value">
          數值
        </InputLabel>
        <Select
          value={value}
          onChange={handleSelectChange}
          input={<Input name="value" id="value" />}
          name="value"
          className={classes.selectEmpty}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
    </div>
  }
}


export default withStyles(styles)(SocketsAndLinksEditor);