import React, { Component } from 'react';
import TypeChip from './TypeChip';
import { conditions } from '../../data/Classified';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TrueIcon from '@material-ui/icons/Check';
import FalseIcon from '@material-ui/icons/Close';
import NoneIcon from '@material-ui/icons/ChangeHistory';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  formControl: {
    width: '90px'
  }
})

const nextValues = ({
  'primary': true,
  'secondary': false,
  'default': undefined
})

const Icon = (props) => {
  const { value } = props;
  return value === undefined
    ? <NoneIcon />
    : value ? <TrueIcon /> : <FalseIcon />
}

class TypeEditorDetails extends Component{
  shouldComponentUpdate = (nextProps, _nextState) => {
    const { expanded } = this.props;
    return expanded || nextProps.expanded;
  }

  render(){
    const { Type } = conditions;
    const { classes, types, onClick } = this.props;
    return <Grid container>
      <Grid item xs={12}>
        <div className={classes.root}>
          {Type.map( t => {
            const value = types[t];
            const color = value === undefined
              ? 'primary'
              : ( value ? 'secondary' : 'default');
            const nextValue = nextValues[color];
            return <Button
              key={t}
              variant="contained"
              color={color}
              onClick={() => onClick(t, nextValue)}
            >
              <Icon value={nextValue}/>
              {t}
            </Button>
          })}
        </div>
      </Grid>
    </Grid>
  }
}

class TypeEditor extends Component{

  handleButtonClick = (type, value) => this.props.onChange(type)(value);

  render(){
    const { types, classes, onChange, expanded, onPanelExpand } = this.props;
    const { handleButtonClick } = this;
    return <ExpansionPanel expanded={expanded} onChange={onPanelExpand}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item xs={3}>
            <Typography>型態</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>編輯所要過濾的型態類型</Typography>
          </Grid>
          <Grid item xs={12}>
            {Object.keys(types).map( t => 
              <TypeChip
                type={t}
                value={types[t]}
                key={t}
                onDelete={() => onChange(t)(undefined)}
              />
            )}
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TypeEditorDetails
          expanded={expanded}
          classes={classes}
          types={types}
          onClick={handleButtonClick}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  }
}

export default withStyles(styles)(TypeEditor);