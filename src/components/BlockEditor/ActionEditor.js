import React, { Component } from 'react';
import Item from '.././Item/Item';
import ItemBoxEditor from './ItemBoxEditor';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

class ActionEditor extends Component{

  render(){
    const { actions: {
      SetFontSize, SetBorderColor, SetBackgroundColor, SetTextColor
    }, onMultiChange } = this.props;
    return <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item xs={3}>
            <Typography>外觀與行為</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>編輯掉落物的外觀與行為</Typography>
          </Grid>
          <Grid item xs={12}>
            <Item
              textColor={SetTextColor}
              borderColor={SetBorderColor}
              backgroundColor={SetBackgroundColor}
              fontSize={SetFontSize}
            />
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container>
          <Grid item xs={12}>
            <ItemBoxEditor
              textColor={SetTextColor}
              borderColor={SetBorderColor}
              backgroundColor={SetBackgroundColor}
              fontSize={SetFontSize}
              onChange={onMultiChange}
            />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  }
}


export default ActionEditor;