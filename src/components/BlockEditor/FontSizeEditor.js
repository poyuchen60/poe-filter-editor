import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';

const styles = ({
  slider: {
    padding: '22px 0'
  },
  container: {
    position: 'relative',
    marginTop: '20px'
  },
  cover: {
    display: 'flex',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alighItems: 'center'
  },
  button: {
    display: 'flex'
  }
})

const FontSizeEditor = (props) => {
  const { fontSize, classes, onChange }  = props;
  return <div className={classes.container}>
    { fontSize
    ? <div>
      <Typography>{`文字大小: ${fontSize.value}`}</Typography>
      <Slider
        classes={{ container: classes.slider }}
        value={fontSize.value}
        min={18}
        max={45}
        step={1}
        onChange={onChange}
      />
    </div>
    : <div className={classes.cover}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => onChange(undefined, 32)}
      >
        修改大小
      </Button>
    </div>
    }
  </div>
}

export default withStyles(styles)(FontSizeEditor);