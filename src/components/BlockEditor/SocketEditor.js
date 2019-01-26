import React, { Component } from 'react';
import SocketsAndLinksEditor from './SocketsAndLinksEditor';
import SocketGroupEditor from './SocketGroupEditor';
import { SocketsChip, LinkedSocketsChip, SocketGroupChip } from './SocketChip';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

class SocketEditorDetails extends Component {
  shouldComponentUpdate = (nextProps) => {
    const { expanded } = this.props;
    return expanded || nextProps.expanded;
  }
  render(){
    const { 
      Sockets, LinkedSockets, SocketGroup,
      onChange
    } = this.props;
    return <div>
      <SocketsAndLinksEditor
        setting={Sockets}
        name={"插槽數量"}
        onChange={onChange("Sockets")}
      />
      <SocketsAndLinksEditor
        setting={LinkedSockets}
        name={"最大連線"}
        onChange={onChange("LinkedSockets")}
      />
      <SocketGroupEditor
        setting={SocketGroup}
        onChange={onChange("SocketGroup")}
      />
    </div>
  }
}

class SocketEditor extends Component {

  handleChipDelete = (prop) => () => this.props.onChange(prop)(undefined);

  render(){
    const {
      sockets: {
        Sockets, LinkedSockets, SocketGroup
      }, expanded, onPanelExpand, onChange
    } = this.props;
    const { handleChipDelete } = this;
    return <ExpansionPanel expanded={expanded} onChange={onPanelExpand}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item xs={3}>
            <Typography>插槽與連線</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>編輯所要過濾的插槽連線</Typography>
          </Grid>
          <Grid item xs={12}>
            <SocketsChip
              setting={Sockets}
              onDelete={handleChipDelete("Sockets")}
            />
            <LinkedSocketsChip
              setting={LinkedSockets}
              onDelete={handleChipDelete("LinkedSockets")}
            />
            <SocketGroupChip
              setting={SocketGroup}
              onDelete={handleChipDelete("SocketGroup")}
            />
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <SocketEditorDetails
          expanded={expanded}
          Sockets={Sockets}
          LinkedSockets={LinkedSockets}
          SocketGroup={SocketGroup}
          onChange={onChange}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  }
}

export default SocketEditor;