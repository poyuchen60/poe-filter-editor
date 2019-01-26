import React, { Component } from 'react';
import Item from '.././Item/Item';
import ItemBoxEditor from './ItemBoxEditor';
import MinimapIconEditor from './MinimapIconEditor';
import PlayAlertSoundEditor from './PlayAlertSoundEditor';
import PlayEffectEditor from './PlayEffectEditor';
import { MinimapIconChip, PlayAlertSoundChip, PlayEffectChip } from './ActionChip';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

class ActionEditorDetails extends Component{
  shouldComponentUpdate = (nextProps) => {
    const { expanded } = this.props;
    return expanded || nextProps.expanded;
  }
  render(){
    const {
      MinimapIcon, PlayAlertSound, PlayEffect,
      SetTextColor, SetBorderColor, SetBackgroundColor, SetFontSize,
      onMultiChange, expanded
    } = this.props;
    return <Grid container>
      <Grid item xs={12}>
        <MinimapIconEditor
          setting={MinimapIcon}
          onChange={onMultiChange}
        />
      </Grid>
      <Grid item xs={12}>
        <PlayAlertSoundEditor
          setting={PlayAlertSound}
          onChange={onMultiChange}
        />
      </Grid>
      <Grid item xs={12}>
        <PlayEffectEditor
          setting={PlayEffect}
          onChange={onMultiChange}
        />
      </Grid>
      <Grid item xs={12}>
        <ItemBoxEditor
          expanded={expanded}
          textColor={SetTextColor}
          borderColor={SetBorderColor}
          backgroundColor={SetBackgroundColor}
          fontSize={SetFontSize}
          onChange={onMultiChange}
        />
      </Grid>
    </Grid>
  }
}


class ActionEditor extends Component{

  handleChipDelete = (prop) => () => {
    const { onMultiChange } = this.props;
    onMultiChange({
      [prop]: undefined
    })
  }

  render(){
    const { actions: {
      SetFontSize, SetBorderColor, SetBackgroundColor, SetTextColor,
      MinimapIcon, PlayAlertSound, PlayEffect,
    }, onMultiChange, expanded, onPanelExpand } = this.props;
    const { handleChipDelete } = this;

    return <ExpansionPanel expanded={expanded} onChange={onPanelExpand}>
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
            <MinimapIconChip
              setting={MinimapIcon}
              onDelete={handleChipDelete("MinimapIcon")}
            />
            <PlayAlertSoundChip
              setting={PlayAlertSound}
              onDelete={handleChipDelete("PlayAlertSound")}
            />
            <PlayEffectChip
              setting={PlayEffect}
              onDelete={handleChipDelete("PlayEffect")}
            />
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ActionEditorDetails
          expanded={expanded}
          SetFontSize={SetFontSize}
          SetBorderColor={SetBorderColor}
          SetBackgroundColor={SetBackgroundColor}
          SetTextColor={SetTextColor}
          MinimapIcon={MinimapIcon}
          PlayAlertSound={PlayAlertSound}
          PlayEffect={PlayEffect}
          onMultiChange={onMultiChange}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  }
}


export default ActionEditor;