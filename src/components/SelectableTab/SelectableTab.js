import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  text: {
    color: 'green',
  }
})

class SelectableTab extends Component{
  state = {
    index: 0,
  }

  handleChange = (event, value) => {
    this.setState({index: value});
  }

  render(){
    const { index } = this.state;
    const { data, onItemClick, classes, selected } = this.props;
    return data.length > 0 && (
      <Fragment>
        <Tabs
          value={index}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
        >
          {data.map( d => <Tab key={d.category} label={d.category} />)}
        </Tabs>
        <List>
          {data.length > index && data[index].items.map(i => {
            const isSelected = selected.includes(i);
            return <ListItem button key={i} onClick={() => onItemClick(i)}>
              <ListItemText primary={i} classes={{primary: isSelected ? classes.text : {}}} />
            </ListItem>
          })}
        </List>
      </Fragment>
    )
  }
}

export default withStyles(styles)(SelectableTab);