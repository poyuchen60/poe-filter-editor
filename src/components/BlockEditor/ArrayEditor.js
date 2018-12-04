import React, { Component } from 'react';
import ItemClass from '../../data/ItemClass.json'
import SelectableTab from '../SelectableTab/SelectableTab';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';


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
    onChange(selected.slice(0, index).concat(selected.slice(index + 1)));
  }
  handleItemClick = item => {
    const index = this.props.selected.indexOf(item);
    index < 0 ? this.handleItemCreate(item) : this.handleItemDelete(index);
  }
  render(){
    const {
      title, description, classification, selected,
    } = this.props;
    const { handleItemClick, handleItemDelete } = this;
    const { input } = this.state;
    return (
      <ExpansionPanel>
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
                <Chip
                  key={i}
                  label={i}
                  onDelete={() => handleItemDelete(index)}
                  variant="outlined"
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
                selected={selected}
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
  const { selected, onChange } = props;
  return <ArrayEditor
    title='類別'
    description='編輯所要過濾的物品類別'
    selected={selected}
    classification={ItemClass}
    onChange={onChange}
  />
}

export default ArrayEditor;
export { ClassEditor };