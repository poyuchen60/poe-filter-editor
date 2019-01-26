import React, { Component, Fregment } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';


import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';



class DataEditorBlock extends Component {
  state = {
    input: ''
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    const { input } = this.state;
    const { items } = this.props;
    return nextState.input !== input
      || nextProps.items.length !== items.length;
  };

  createNewItem = () => this.props.onNewItem(this.state.input);

  handleKeyPress = (event) => {
    if(event.key === 'Enter' && this.state.input.length > 0){
      this.createNewItem();
    }
  }

  itemChip = (name, i) => <Chip style={{margin: "5px 3px 0 0"}}key={i} label={name} onDelete={() => this.props.onItemDelete(i)}/>;
  handleChange = event => this.setState({input: event.target.value});
  render(){
    const { title, items, onCategoryDelete } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={4}>
              <Input
                placeholder="按此新增"
                value={this.state.input}
                onChange={this.handleChange}
                style={{margin: '5px'}}
                onKeyPress={this.handleKeyPress}
              />
              <IconButton
                color='primary'
                disabled={this.state.input.length === 0}
                onClick={ this.createNewItem }
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
            </Grid>
            <Grid item xs={12}>
              {items.map(this.itemChip)}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <IconButton onClick={onCategoryDelete}><DeleteIcon /></IconButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}

export default DataEditorBlock;


