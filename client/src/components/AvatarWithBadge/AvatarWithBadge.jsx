import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import withStyles from '@material-ui/styles/withStyles';

const AvatarWithBadge = withStyles(theme => ({
  active: {
    backgroundColor: '#44b700',
    color: '#44b700',
  },
  inactive: {
    backgroundColor: 'gray',
    color: 'gray',
  },
}))(({ classes, active, src }) => {
  return (
    <Badge
      classes={{ badge: active ? classes.active : classes.inactive }}
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

export default AvatarWithBadge;
