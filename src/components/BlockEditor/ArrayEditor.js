import React, { Component } from 'react';
import ItemClass from '../../data/ItemClass.json'
import BaseType from '../../data/BaseType.json'
import SelectableTab from '../SelectableTab/SelectableTab';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

class ArrayEditorChip extends Component {
  shouldComponentUpdate = () => {
    return false;
  }

  handleDelete = () => this.props.onDelete();

  render(){
    const { name } = this.props;
    return <Chip
      label={name}
      onDelete={this.handleDelete}
      variant="outlined"
    />
  }
}

class ArrayEditor extends Component{
  state={
    input: ''
  }
  handleInputChange = event => this.setState({input: event.target.value});
  handleInputSubmit = () => {
    const { input } = this.state;
    if(input.length > 0){
      this.handleItemCreate(input);
      this.setState({ input: '' });
    }
  }
  handleInputKeyPress = event => event.key === 'Enter' && this.handleInputSubmit();

  handleItemCreate = item => {
    const { onChange, selected } = this.props;
    selected.indexOf(item) < 0 && onChange([...selected, item]);
  }
  handleItemDelete = index => {
    const { onChange, selected } = this.props;
    const newValue = selected.slice(0, index).concat(selected.slice(index + 1));
    onChange(newValue.length === 0 ? undefined : newValue);
  }
  handleItemClick = item => {
    const index = this.props.selected.indexOf(item);
    index < 0 ? this.handleItemCreate(item) : this.handleItemDelete(index);
  }
  render(){
    const {
      title, description, classification, selected,
      expanded, onPanelExpand
    } = this.props;
    const { handleItemClick, handleItemDelete } = this;
    const { input } = this.state;
    return (
      <ExpansionPanel expanded={expanded} onChange={onPanelExpand}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <Grid item xs={3}>
              <Typography>{title || 'Array Editor'}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{description || 'No description'}</Typography>
            </Grid>
            <Grid item xs={12}>
              {selected && selected.map( (i, index) => (
                <ArrayEditorChip
                  key={i}
                  name={i}
                  onDelete={() => handleItemDelete(index)}
                />
              ))}
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container >
            <Grid item xs={3}>
              <Input
                placeholder="點此新增"
                value={input}
                onChange={this.handleInputChange}
                onKeyPress={this.handleInputKeyPress}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectableTab
                data={classification || []}
                selected={selected || []}
                onItemClick={handleItemClick}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

const ClassEditor = (props) => {
  const { selected, onChange, expanded, onPanelExpand } = props;
  return <ArrayEditor
    expanded={expanded}
    onPanelExpand={onPanelExpand}
    title='類別'
    description='編輯所要過濾的物品類別'
    selected={selected || []}
    classification={ItemClass}
    onChange={onChange}
  />
}
const BaseTypeEditor = (props) => {
  const { selected, onChange, expanded, onPanelExpand } = props;
  return <ArrayEditor
    expanded={expanded}
    onPanelExpand={onPanelExpand}
    title='基底'
    description='編輯所要過濾的物品基底'
    selected={selected || []}
    classification={BaseType}
    onChange={onChange}
  />
}

export default ArrayEditor;
export { ClassEditor, BaseTypeEditor };