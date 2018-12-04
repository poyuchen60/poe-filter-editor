import React, { Component } from 'react';
import ColorEditor from '.././ColorEditor/ColorEditor';
import SwipeableViews from 'react-swipeable-views';
import Item from '.././Item/Item';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import IconButton from '@material-ui/core/IconButton';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import { withStyles } from '@material-ui/core/styles';

const styles = ({
  slider: {
    padding: '22px 0'
  },
  footer: {
    display: 'flex',
    height: '50px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    display: 'felx'
  }
})

class ItemBoxEditor extends Component{
  constructor(props){
    super(props);
    const {
      textColor, backgroundColor, borderColor, fontSize
    } = props;
    this.state = {
      textColor, backgroundColor, borderColor, fontSize,
      tabIndex: 0,
      modified: false
    }
  }
  
  handleTabChange = (_event, tabIndex) => this.setState({tabIndex});
  handleColorChange = prop => color => this.setState({[prop]: color, modified: true});
  handleFontSizeChange = (_event, value) => this.setState({fontSize: {value}, modified: true});
  handleReset = () => {
    const {
      textColor, backgroundColor, borderColor, fontSize
    } = this.props;
    this.setState({
      textColor, backgroundColor, borderColor, fontSize,
      modified: false
    })
  };
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
      handleTabChange, handleColorChange, handleReset, handleSubmit
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
          color={borderColor}
          onColorChange={handleColorChange("borderColor")}
        />
        <ColorEditor
          color={textColor}
          onColorChange={handleColorChange("textColor")}
        />
      </SwipeableViews>
      <div>
        <Typography>{`文字大小: ${fontSize.value}`}</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={fontSize.value}
          min={18}
          max={45}
          step={1}
          onChange={this.handleFontSizeChange}
        />
      </div>
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

export default withStyles(styles)(ItemBoxEditor);