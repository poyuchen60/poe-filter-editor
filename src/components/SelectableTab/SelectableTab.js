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

class SelectableListItem extends Component{
  shouldComponentUpdate = (nextProps) => {
    const { isSelected } = this.props;
    return isSelected !== nextProps.isSelected;
  }
  render(){
    const { onItemClick, name, isSelected, classes } = this.props;
    return <ListItem
      button
      key={name}
      onClick={onItemClick}
    >
      <ListItemText
        primary={name}
        classes={{primary: isSelected ? classes.text : ""}}
      />
    </ListItem>
  }
}
class SelectableTabs extends Component{
  shouldComponentUpdate = (nextPros, _nextState) => {
    const { index } = this.props;
    return index !== nextPros.index;
  }
  render(){
    const { index, data, onChange } = this.props;
    return <Tabs
      value={index}
      onChange={onChange}
      indicatorColor="primary"
      textColor="primary"
      scrollable
      scrollButtons="auto"
    >
      {data.map( d => <Tab key={d.category} label={d.category} />)}
    </Tabs>
  }
}

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
        <SelectableTabs
          index={index}
          data={data}
          onChange={this.handleChange}
        />
        <List key={index}>
          {data.length > index && data[index].items.map(name => {
            const isSelected = selected && selected.includes(name);
            return <SelectableListItem
              key={name}
              onItemClick={() => onItemClick(name)}
              name={name}
              classes={classes}
              isSelected={isSelected}
            />
          })}
        </List>
      </Fragment>
    )
  }
}

export default withStyles(styles)(SelectableTab);