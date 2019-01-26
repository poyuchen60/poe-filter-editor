import React, { Component } from 'react';
import ConstraintChip from './ConstraintChip';
import ConstraintForm from './ConstraintForm';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

class ConstraintEditorDetails extends Component {
  shouldComponentUpdate = (nextProps) => this.props.expanded || nextProps.expanded;

  render(){
    const {
      constraints, selected,
      onChange, onListItemClick, onListItemDelete
    } = this.props;
    return <Grid container>
      <Grid item xs={6}>
        <ConstraintForm 
          constraint={selected}
          body={constraints[selected]}
          key={selected}
          onChange={onChange}
        />
        <List>
          { Object.keys(constraints).map( c => {
            const { value, operator } = constraints[c];
            return <ListItem
              button
              key={c}
              onClick={() => onListItemClick(c)}
            >
              <ListItemText primary={`${c} ${operator} ${value}`} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onListItemDelete(c)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          })}
        </List>
      </Grid>
    </Grid>
  }
}

class ConstraintEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: '',
      expanded: false
    }
  }

  handleListItemClick = c => {
    this.setState({selected: c});
  }
  handleListItemDelete = c => {
    this.props.onChange(c)(undefined);
  }

  handleChipClick = (c) => {
    this.props.onPanelExpand(undefined, true);
    this.setState({selected: c});
  }

  render(){
    const { constraints, onChange, expanded, onPanelExpand } = this.props;
    const { selected } = this.state;
    const { handleListItemClick, handleListItemDelete } = this;
    return <ExpansionPanel expanded={expanded} onChange={onPanelExpand}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item xs={3}>
            <Typography>限制</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>編輯所要過濾的數值範圍</Typography>
          </Grid>
          <Grid item xs={12}>
            {Object.keys(constraints).map( c => 
              <ConstraintChip
                constraint={c}
                key={c}
                body={constraints[c]}
                onDelete={() => onChange(c)(undefined)}
                onClick={() => this.handleChipClick(c)}
              />
            )}
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ConstraintEditorDetails
          expanded={expanded}
          selected={selected}
          constraints={constraints}
          onChange={onChange}
          onListItemClick={handleListItemClick}
          onListItemDelete={handleListItemDelete}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  }
}

export default ConstraintEditor;