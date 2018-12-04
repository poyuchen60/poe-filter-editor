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

class ConstraintEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: ''
    }
  }

  handleListItemClick = c => {
    this.setState({selected: c});
  }
  handleListItemDelete = c => {
    this.props.onChange(c)(undefined);
  }

  render(){
    const { constraints, onChange } = this.props;
    const { selected } = this.state;
    return <ExpansionPanel>
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
              />
            )}
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container >
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
                  onClick={() => this.handleListItemClick(c)}
                >
                  <ListItemText primary={`${c} ${operator} ${value}`} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => this.handleListItemDelete(c)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              })}
            </List>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  }
}

export default ConstraintEditor;