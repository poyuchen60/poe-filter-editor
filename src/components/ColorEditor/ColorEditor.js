import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = ({
  cover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    position: 'relative',
    display: 'inline-flex',
    padding: "5px"
  },
  delete: {
    position: 'absolute',
    width: '15px',
    height: '15px',
    right: 0,
    bottom: 0
  }
})

const defaultColor = ({
  r: 0, g: 0, b: 0, a: 0.8
})

class ColorEditor extends Component {
  render(){
    const { color, onColorChange, classes } = this.props
    const bgColor = color
      ? `rgba(${color.r}, ${color.g}, ${color.b})`
      : "rgba(0, 0, 0, 1)";
    return (
      <div className={classes.container} style={{backgroundColor: bgColor}}>
        {!color && <div className={classes.cover}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onColorChange(defaultColor)}
          >
            新增
          </Button>
        </div>}
        <ChromePicker
          color={color || defaultColor}
          onChange={(color) => onColorChange(color.rgb)}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ColorEditor);