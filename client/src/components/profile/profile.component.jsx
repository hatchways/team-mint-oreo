import React from 'react';
import { Avatar, Box, Grid, Chip, IconButton, Typography, Badge } from '@material-ui/core';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import { useStyles } from './profile.styles';
import AvatarWithBadge from '../AvatarWithBadge/AvatarWithBadge';

const Profile = (
  {
    invitation, // THIS IS A TEMPORARY VALUE
    name,
    secondary = '',
    unreadMessages = 0,
    moreOptions = null,
    avatar,
    handleApproval = null,
    handleRejection = null,
    isOnline = false,
    onClick4More = () => {},
  },
  width = 400
) => {
  const classes = useStyles();

  const url = avatar;

  return (
    <Box minWidth={width} maxWidth={width}>
      <Box p={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <AvatarWithBadge src={url} active={isOnline} />
          </Grid>
          <Grid item xs>
            {secondary === '' ? (
              <Typography>{name}</Typography>
            ) : (
              /* <Typography>{fromUser}</Typography> */
              <div>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>{name}</Typography>
                  </Grid>
                  <Grid item>{secondary}</Grid>
                </Grid>
              </div>
            )}
          </Grid>
          {unreadMessages > 0 && (
            <Grid item xs={1}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Chip label={unreadMessages} className={classes.chipStyle} />
                </Grid>
              </Grid>
            </Grid>
          )}
          {moreOptions !== null && (
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton onClick={onClick4More}>
                    <MoreHoriz />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          )}
          {handleApproval !== null && handleRejection !== null && (
            <Grid item xs>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item>
                  <IconButton onClick={event => handleApproval(event)}>
                    <Check />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={event => handleRejection(event)}>
                    <Clear />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default React.memo(Profile);
