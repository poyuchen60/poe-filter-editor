import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';

const styles = (theme) => ({
  formControl: {
    margin: "5px",
    minWidth: 120,
  },
})
const defaultValue = ({
  color: "Red",
  temp: false
})

class PlayEffectEditor extends Component {

  handleCheckboxChange = (event) => {
    const { onChange } = this.props;
    const checked = event.target.checked;
    onChange({
      PlayEffect: checked ? defaultValue : undefined
    })
  }
  handleChange = (event) => {
    const { setting, onChange } = this.props;
    onChange({
      PlayEffect: {
        ...setting,
        [event.target.name]: event.target.value
      }
    })
  }

  render(){
    const { classes, setting } = this.props;
    const isSet = setting ? true : false;
    const { color, temp } = (setting || defaultValue);
    const { handleCheckboxChange, handleChange } = this;
    return <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={isSet}
            onChange={handleCheckboxChange}
          />
        }
        label="光束特效"
      />
      <FormControl className={classes.formControl} disabled={!isSet}>
        <InputLabel shrink htmlFor="color">
          顏色
        </InputLabel>
        <Select
          value={color}
          onChange={handleChange}
          input={<Input name="color" id="color" />}
          name="color"
        >
          <MenuItem value={"Red"}>Red</MenuItem>
          <MenuItem value={"Green"}>Green</MenuItem>
          <MenuItem value={"Blue"}>Blue</MenuItem>
          <MenuItem value={"Brown"}>Brown</MenuItem>
          <MenuItem value={"White"}>White</MenuItem>
          <MenuItem value={"Yellow"}>Yellow</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} disabled={!isSet}>
        <InputLabel shrink htmlFor="temp">
          持續時間
        </InputLabel>
        <Select
          value={temp}
          onChange={handleChange}
          input={<Input name="temp" id="temp" />}
          name="temp"
        >
          <MenuItem value={true}>暫時</MenuItem>
          <MenuItem value={false}>永久</MenuItem>
        </Select>
      </FormControl>
    </div>
  }
}

export default withStyles(styles)(PlayEffectEditor);