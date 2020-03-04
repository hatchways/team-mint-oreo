import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

export const useStyles = makeStyles(theme => ({
  header: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    marginBottom: '8px',
    display: 'flex',
  },
  bigPadd: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: `0, ${theme.spacing(2)}`,
    },
  },
  lessSpacingOnXS: {
    spacing: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      spacing: 0,
    },
  },
  isOnlineBadge: props => ({
    backgroundColor: props.isonline ? 'blue' : 'green',
    width: '100px',
    height: '100px',
    border: '1px solid black',
  }),
}));

export const AvatarWithBadge = withStyles(theme => ({
  active: {
    backgroundColor: '#44b700',
    color: '#44b700',
  },
  inactive: {
    backgroundColor: 'gray',
    color: 'gray',
  },
}))(({ classes, isonline, src }) => {
  return (
    <Badge
      classes={{ badge: isonline ? classes.active : classes.inactive }}
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
    >
      <Avatar src={src} />
    </Badge>
  );
});

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
        backgroundColor: theme.palette.primary.main,
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
