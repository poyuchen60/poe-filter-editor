import React, { Component, Fragment } from 'react';
import DataEditorBlock from './DataEditorBlock';
import SelectableTab from '../SelectableTab/SelectableTab';
import ItemClass from '../../data/ItemClass.json';

import { List, fromJS } from 'immutable';

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


class DataEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      data: fromJS(ItemClass),
      selected: List(),
      open: false,
      dialogContent: '',
    }
    console.log(this.state.data);
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
  handleChange = event => this.setState({input: event.target.value});
  handleSubmit = () => {
    const { data, input } = this.state;
    if(input.length > 0 && data.some( c => c.get('category') === input)){
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

  render(){
    const { data, selected, open, dialogContent } = this.state;
    const dataArray = data.toArray().map( c => ({
      category: c.get('category'),
      items: c.get('items').toArray()
    }));
    return (
      <Fragment>
        <Button color="primary" onClick={this.handleDialogToggle}>
          輸出
        </Button>
        <SelectableTab
          selected={selected.toArray()}
          data={dataArray}
          onItemClick={this.handleItemSelect}
        />
        <TextField
          value={this.state.input}
          onChange={this.handleChange}
          label="新增"
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color='primary'
                  disabled={this.state.input.length === 0}
                  onClick={this.handleSubmit}
                >
                  <AddIcon/>
                </IconButton>
                <IconButton
                  color='secondary'
                  disabled={this.state.input.length === 0}
                  onClick={() => this.setState({input: ''})}
                >
                  <ClearIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
        >
          <DialogTitle id="scroll-dialog-title">分類</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogContent}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>    
    )
  }
}

export default DataEditor;