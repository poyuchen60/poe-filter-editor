import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const styles = (theme) => ({
  formControl: {
    margin: "5px",
    minWidth: 120,
  },
})
const defaultValue = ({
  id: 1,
  volume: 200
})

class PlayAlertSoundEditor extends Component {

  handleCheckboxChange = (event) => {
    const { onChange } = this.props;
    const checked = event.target.checked;
    onChange({
      PlayAlertSound: checked ? defaultValue : undefined
    })
  }
  handleChange = (event) => {
    const { setting, onChange } = this.props;
    onChange({
      PlayAlertSound: {
        ...setting,
        [event.target.name]: event.target.value
      }
    })
  }

  render(){
    const { classes, setting } = this.props;
    const isSet = setting ? true : false;
    const { id, volume } = (setting || defaultValue);
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
        label="掉落音效"
      />
      <FormControl className={classes.formControl} disabled={!isSet}>
        <InputLabel shrink htmlFor="id">
          編號
        </InputLabel>
        <Select
          native
          value={id}
          onChange={handleChange}
          input={<Input name="id" id="id" />}
          name="id"
        >
          {[...Array(9).keys()].map(k => k+1).map( k => 
            <option key={k} value={k}>{k}</option>
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} disabled={!isSet}>
        <InputLabel shrink htmlFor="volume">
          音量
        </InputLabel>
        <Select
          native
          value={volume}
          onChange={handleChange}
          input={<Input name="volume" id="volume" />}
          name="volume"
        >
          {[...Array(7).keys()].map(k => k*50).map( k => 
            <option key={k} value={k}>{k}</option>
          )}
        </Select>
      </FormControl>
    </div>
  }
}

export default withStyles(styles)(PlayAlertSoundEditor);