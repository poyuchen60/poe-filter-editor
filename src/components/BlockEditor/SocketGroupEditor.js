import React,{ Component } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const defaultValue = {
  value: "RGB"
}

class SocketGroupEditor extends Component {

  handleButtonClick = (color) => () => {
    const { setting, onChange } = this.props;
    onChange({
      value: setting ? (setting.value + color) : color
    });
  }
  handleCheckboxChange = (event) => {
    const { onChange } = this.props;
    const checked = event.target.checked;
    onChange(checked ? defaultValue : undefined)
  }
  handleClear = () => this.props.onChange(undefined);

  render(){
    const { setting } = this.props;
    const isSet = setting ? true : false;
    const { handleCheckboxChange, handleButtonClick, handleClear } = this;
    return <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={isSet}
            onChange={handleCheckboxChange}
          />
        }
        label={"連線組合"}
      />
      <Input
        disabled
        value={isSet ? setting.value : "未設定"}
      />
      <Button color="primary" onClick={handleButtonClick("R")}>
        R
      </Button>
      <Button color="primary" onClick={handleButtonClick("G")}>
        G
      </Button>
      <Button color="primary" onClick={handleButtonClick("B")}>
        B
      </Button>
      <Button color="primary" onClick={handleButtonClick("W")}>
        W
      </Button>
      <Button color="secondary" disabled={!isSet} onClick={handleClear}>
        取消
      </Button>
    </div>
  }
}

export default SocketGroupEditor;