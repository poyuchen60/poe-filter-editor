import React, { Component } from 'react';
import ColorEditor from '.././ColorEditor/ColorEditor';
import FontSizeEditor from './FontSizeEditor';
import SwipeableViews from 'react-swipeable-views';
import Item from '.././Item/Item';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import { withStyles } from '@material-ui/core/styles';

const styles = ({
  footer: {
    display: 'flex',
    height: '50px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    width: '90px',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const mapStateToProps = (state) => ({
  focusOn: state.operationReducer.focusOn
})

class ItemBoxEditor extends Component{

  static initialState = ({
    textColor, backgroundColor, borderColor, fontSize,
  }) => ({
    textColor, backgroundColor, borderColor, fontSize,
    tabIndex: 0,
    modified: false
  })

  constructor(props){
    super(props);
    this.state = ItemBoxEditor.initialState(props);
  }
  shouldComponentUpdate = (nextProps) => {
    const { expanded } = this.props;
    return expanded || nextProps.expanded;
  }
  componentDidUpdate = (preProps) => {
    const { focusOn, expanded } = this.props;
    expanded
      && (focusOn !== preProps.focusOn || preProps.expanded === false)
      && this.handleReset();
  }
  
  handleTabChange = (_event, tabIndex) => this.setState({tabIndex});
  handleColorChange = prop => color => this.setState({[prop]: color, modified: true});
  handleFontSizeChange = (_event, value) => this.setState({fontSize: {value}, modified: true});
  handleReset = () => this.setState(ItemBoxEditor.initialState(this.props))
  handleSubmit = () => {
    const { onChange } = this.props;
    const { textColor, backgroundColor, borderColor, fontSize } = this.state;
    const block = {
      SetTextColor: textColor,
      SetBackgroundColor: backgroundColor,
      SetBorderColor: borderColor,
      SetFontSize: fontSize
    }
    onChange(block);
    this.setState({modified: false});
  }

  render(){
    const { classes } = this.props;
    const {
      tabIndex, modified,
      textColor, backgroundColor, borderColor, fontSize
    } = this.state;
    const {
      handleTabChange, handleColorChange, handleReset, handleSubmit,
      handleFontSizeChange
    } = this;
    return <div style={{width: '520px'}}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
      >
        <Tab label="背景顏色" />
        <Tab label="邊框顏色" />
        <Tab label="文字顏色" />
      </Tabs>
      <SwipeableViews
        index={tabIndex}
        onChangeIndex={(tabIndex) => handleTabChange('', tabIndex)}
        >
        <Grid container>
          <Grid item xs={6}>
            <ColorEditor
              currentIndex={tabIndex}
              index={0}
              color={backgroundColor}
              onColorChange={handleColorChange("backgroundColor")}
            />
          </Grid>
          <Grid component={List} item xs={6}>
            <ListItem button>
              <ListItemText>Hi</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>Hi</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>Hi</ListItemText>
            </ListItem>
          </Grid>
        </Grid>
        <ColorEditor
          currentIndex={tabIndex}
          index={1}
          color={borderColor}
          onColorChange={handleColorChange("borderColor")}
        />
        <ColorEditor
          currentIndex={tabIndex}
          index={2}
          color={textColor}
          onColorChange={handleColorChange("textColor")}
        />
      </SwipeableViews>
      <FontSizeEditor
        fontSize={fontSize}
        onChange={handleFontSizeChange}
      />
      <div className={classes.footer}>
        <div className={classes.item}>
          <Item 
            textColor={textColor}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            fontSize={fontSize}
          />
        </div>
        <div className={classes.item}>
          <IconButton
            color='primary'
            disabled={!modified}
            onClick={handleSubmit}
          >
            <DoneIcon />
          </IconButton>
          <IconButton 
            color='secondary'
            disabled={!modified}
            onClick={handleReset}
          >
            <ClearIcon />
          </IconButton>
        </div>
      </div>
    </div>
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ItemBoxEditor));