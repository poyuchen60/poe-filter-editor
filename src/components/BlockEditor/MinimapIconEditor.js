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
    minWidth: 120,
  },
})
const defaultValue = ({
  color: "Red",
  size: 0,
  shape: "Circle"
})

class MinimapIconEditor extends Component {

  shouldComponentUpdate = (nextProps) => {
    const { setting } = this.props;
    return setting || nextProps.setting || false;
  }

  handleCheckboxChange = (event) => {
    const { onChange } = this.props;
    const checked = event.target.checked;
    onChange({
      MinimapIcon: checked ? defaultValue : undefined
    })
  }
  handleSelectChange = (event) => {
    const { setting, onChange } = this.props;
    onChange({
      MinimapIcon: {
        ...setting,
        [event.target.name]: event.target.value
      }
    })
  }

  render(){
    const { classes, setting } = this.props;
    const isSet = setting ? true : false;
    const { shape, color, size } = (setting || defaultValue);
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
        label="地圖標誌"
      />
      <FormControl className={classes.formControl} disabled={!isSet}>
        <InputLabel shrink htmlFor="shape">
          標誌
        </InputLabel>
        <Select
          value={shape}
          onChange={handleSelectChange}
          input={<Input name="shape" id="shape" />}
          name="shape"
          className={classes.selectEmpty}
        >
          <MenuItem value={"Circle"}>Circle</MenuItem>
          <MenuItem value={"Diamond"}>Diamond</MenuItem>
          <MenuItem value={"Hexagon"}>Hexagon</MenuItem>
          <MenuItem value={"Square"}>Square</MenuItem>
          <MenuItem value={"Star"}>Star</MenuItem>
          <MenuItem value={"Triangle"}>Triangle</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} disabled={!isSet}>
        <InputLabel shrink htmlFor="color">
          顏色
        </InputLabel>
        <Select
          value={color}
          onChange={handleSelectChange}
          input={<Input name="color" id="color" />}
          name="color"
          className={classes.selectEmpty}
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
        <InputLabel shrink htmlFor="size">
          大小
        </InputLabel>
        <Select
          value={size}
          onChange={handleSelectChange}
          input={<Input name="size" id="size" />}
          name="size"
          className={classes.selectEmpty}
        >
          <MenuItem value={0}>大</MenuItem>
          <MenuItem value={1}>中</MenuItem>
          <MenuItem value={2}>小</MenuItem>
        </Select>
      </FormControl>
    </div>
  }
}

export default withStyles(styles)(MinimapIconEditor);