import React, { Component } from 'react';
import { conditions } from '../.././data/Classified';
import ItemClass from '../../data/ItemClass.json';
import SelectableTab from '.././SelectableTab/SelectableTab';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';


class CreateForm extends Component{
  constructor(props){
    super(props);
    const categories = ["Basic", "Constraint", "Ary", "Type", "Action"];
    const properties = categories.reduce( (outer, c) => {
      outer[c] = conditions[c].reduce( (inner, p) => {
        inner[p] = undefined;
        return inner;
      }, {})
      return outer;
    }, {})

    this.state = {
      activeStep: 0,
      description: '',
      ...properties
    }
  }

  handleInputChange = category => property => value => this.setState((state) => {
    const c = state[category];
    const obj = { ...c, [property] : value };
    return { [category]: obj };
  })

  handleStepButtonClick = (index) => this.setState({activeStep: index});
  
  render(){
    const { activeStep, Basic: { description } } = this.state;
    const { handleStepButtonClick } = this;
    console.log(description);
    return <div>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        <Step>
          <StepButton
            onClick={() => handleStepButtonClick(0)}
          >設定基本資料</StepButton>
          <StepContent>
            <TextField
              label="標題"
              value={description}
              onChange={(event) =>
                this.handleInputChange('Basic')('description')(event.target.value)}
              margin="normal"
            />
          </StepContent>
        </Step>
        <Step>
          <StepButton
            onClick={() => handleStepButtonClick(1)}
          >選擇要過濾的物品類型</StepButton>
          <StepContent>
            <SelectableTab
              data={ItemClass}
            />
          </StepContent>
        </Step>
        <Step>
          <StepButton
            onClick={() => handleStepButtonClick(2)}
          >選擇要過濾的物品基底</StepButton>
        </Step>
        <Step>
          <StepButton
            onClick={() => handleStepButtonClick(3)}
          >新增要限制的條件</StepButton>
        </Step>
        <Step>
          <StepButton
            onClick={() => handleStepButtonClick(4)}
          >編輯掉落物的外觀與行為</StepButton>
        </Step>
        <Step>
          <StepButton
            onClick={() => handleStepButtonClick(5)}
          >其他</StepButton>
        </Step>
      </Stepper>
    </div>
  }
}

export default CreateForm;