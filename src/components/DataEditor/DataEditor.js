import React, { Component } from 'react';
import DataEditorBlock from './DataEditorBlock';
import SelectableTab from '../SelectableTab/SelectableTab';
import ItemClass from '../../data/ItemClass.json';

import { Map, List, fromJS } from 'immutable';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

class InputTextField extends Component{
  constructor(props){
    super(props);
    this.state = {
      input: ''
    }
  }
  handleChange = (event) => this.setState({input: event.target.value});
  handleClear = () => this.setState({input: ''});

  render(){
    const { input } = this.state;
    const { onSubmit } = this.props;
    const { handleChange, handleClear } = this;
    return <TextField
      value={input}
      onChange={handleChange}
      label="新增"
      margin="normal"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color='primary'
              disabled={input.length === 0}
              onClick={() =>　onSubmit(input)}
            >
              <AddIcon/>
            </IconButton>
            <IconButton
              color='secondary'
              disabled={input.length === 0}
              onClick={handleClear}
            >
              <ClearIcon/>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  }
}


class DataEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      data: List(),
      selected: List(),
      open: false,
      dialogContent: '',
    }
  }
  shouldComponentUpdate = (nextprops) => {
    const { hidden } = this.props;
    return !hidden || !nextprops.hidden;
  }
  handleItemSelect = item => {
    const { selected } = this.state;
    const index = selected.indexOf(item);
    index < 0
    ? this.setState({ selected: selected.push(item) })
    : this.setState({ selected: selected.delete(index)});
  }

  handleItemDelete = cIndex => iIndex => {
    const { data } = this.state;
    const category = data.get(cIndex);
    const newCategory = category.set('items', category.get('items').delete(iIndex))
    this.setState({data: data.set(cIndex, newCategory)});
  }
  handleCategoryDelete = cIndex => {
    const { data } = this.state;
    this.setState({data: data.delete(cIndex)});
  }
  handleItemCreate = cIndex => item => {
    const { data } = this.state;
    if( data.get(cIndex).get('items').indexOf(item) < 0){
      const category = data.get(cIndex);
      const newCategory = category.set('items', category.get('items').push(item));
      this.setState({data: data.set(cIndex, newCategory)});
    }
  }
  handleSubmit = (input) => {
    const { data } = this.state;
    if(input.length > 0 && data.every( c => c.get('category') !== input)){
      this.setState({data: data.push(Map({category: input, items: List()}))});
    }
  }
  handleDialogToggle = () => this.setState((prevState, _) => {
    const { data, open } = prevState;
    const nextState = { open: !open }
    if(nextState.open){
      nextState['dialogContent'] = JSON.stringify(data.toJS());
    }
    return nextState;
  });
  handleImport = (data) => {
    data = data || fromJS(JSON.parse(this.state.dialogContent));
    this.setState({data, open: false});
  };
  handleInputChange = event => this.setState({dialogContent: event.target.value});

  componentDidMount = () => {
    this.handleImport(fromJS(ItemClass));
  }

  render(){
    const { hidden } = this.props;
    const { data, selected, open, dialogContent } = this.state;
    const { handleSubmit, handleImport, handleInputChange } = this;
    const dataArray = data.toArray().map( c => ({
      category: c.get('category'),
      items: c.get('items').toArray()
    }));
    return (
      <div style={{display: hidden ? 'none' : 'block'}}>
        <Button color="primary" onClick={this.handleDialogToggle}>
          匯出 / 匯入
        </Button>
        <SelectableTab
          selected={selected.toArray()}
          data={dataArray}
          onItemClick={this.handleItemSelect}
        />
        <InputTextField onSubmit={handleSubmit}/>
        {selected.map( item => 
          <Chip label={item} onDelete={() => this.handleItemSelect(item)}/>
        )}
        {data.map( (c, index) => {
          const category = c.get('category');
          const items = c.get('items').toArray();
          return <DataEditorBlock
            key={category}
            title={category}
            items={items}
            onItemDelete={this.handleItemDelete(index)}
            onCategoryDelete={ () => this.handleCategoryDelete(index)}
            onNewItem={this.handleItemCreate(index)}
          />
        })}
        <Dialog
          open={open}
          onClose={this.handleDialogToggle}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
          fullWidth={true}
          maxWidth='sm'
        >
          <DialogTitle id="scroll-dialog-title">分類</DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleInputChange}
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows="15"
              value={dialogContent}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Button onClick={() => handleImport()} color="primary">
              Import
            </Button>
          </DialogContent>
        </Dialog>
      </div>    
    )
  }
}

export default DataEditor;