import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import ColorEditor from '../ColorEditor/ColorEditor';
import Item from '../Item/Item';
import { fromJS } from 'immutable';

class ItemEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      backgroundColor: {r: 0, g: 0, b: 0, a: 0},
      borderColor: {r: 0, g: 0, b: 0, a: 0},
      textColor: {r: 0, g: 0, b: 0, a: 0}
    }
  }

  componentDidMount = () => {
    this.initialize();
  }

  initialize = () => {
    const b = this.props.block;
    this.setState({
      isModified: false,
      backgroundColor: b.has("SetBackgroundColor") ? b.get("SetBackgroundColor").toObject() : undefined,
      textColor: b.has("SetTextColor") ? b.get("SetTextColor").toObject() : undefined,
      borderColor: b.has("SetBorderColor") ? b.get("SetBorderColor").toObject() : undefined,
    })
  }
  submit = () => {
    this.setState({isModified: false});
    if(this.state.isModified){
      const block = {
        SetBackgroundColor: this.state.backgroundColor,
        SetTextColor: this.state.textColor,
        SetBorderColor: this.state.borderColor
      }
      this.props.onItemChange(fromJS(block));
    }
  }

  handleChange = (event, value) => this.setState({value});
  handleChangeIndex = index => this.setState({value: index});

  onColorChange = (property) => (color, event) => this.setState({[property]: color.rgb, isModified: true});

  render(){
    const { backgroundColor, borderColor, textColor, isModified } = this.state;
    return (
      <div style={{width: "500px"}}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="背景顏色" />
          <Tab label="邊框顏色" />
          <Tab label="文字顏色" />
        </Tabs>
        <SwipeableViews
        index={this.state.value}
        onChangeIndex={this.handleChangeIndex}
        >
          <ColorEditor color={backgroundColor} onColorChange={this.onColorChange("backgroundColor")} />
          <ColorEditor color={borderColor} onColorChange={this.onColorChange("borderColor")} />
          <ColorEditor color={textColor} onColorChange={this.onColorChange("textColor")} />
        </SwipeableViews>
        <Item
          borderColor={borderColor}
          textColor={textColor}
          backgroundColor={backgroundColor}
        />
        <Button disabled={!isModified} onClick={this.initialize} variant="outlined" color="secondary">回復</Button>
        <Button disabled={!isModified} onClick={this.submit} variant="outlined" color="primary">確定</Button>
      </div>
    )
  }
}

export default ItemEditor;