import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';

export const useStyles = makeStyles(theme => ({
  header: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    height: '140px',
    'box-sizing': 'border-box',
  },
  bigPadd: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  lessSpacingOnXS: {
    spacing: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      spacing: theme.spacing(0),
    },
  },
}));

export const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#00f',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.grey[300],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
