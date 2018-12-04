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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

class TypeEditor extends Component{
  handleChange = (event) => {
    let { name, value } = event.target;
    value = value === 'none' ? undefined : (value === 'true')
    this.props.onChange(name)(value);
  }

  render(){
    const { types, classes, onChange } = this.props;
    const { Type } = conditions;
    console.log(types);
    return <ExpansionPanel>
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
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.root}>
              { Type.map( t => {
                const type = types[t];
                return <FormControl
                  key={t}
                  className={classes.formControl}
                  component="fieldset"
                >
                  <FormLabel component="legend">{t}</FormLabel>
                  <RadioGroup
                    aria-label={t}
                    name={t}
                    value={type !== undefined ? String(type) : 'none'}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="none" control={<Radio />} label="None" />
                    <FormControlLabel value="true" control={<Radio color='primary' />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                  </RadioGroup>
                </FormControl>
              })}
            </div>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  }
}

export default withStyles(styles)(TypeEditor);