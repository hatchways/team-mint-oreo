import React, { useState } from 'react';
import { Box, Grid, Typography, Tabs, Tab, makeStyles, withStyles } from '@material-ui/core';

import Profile from '../../components/profile/profile.component';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#000',
    fontWeight: theme.typography.fontWeightRegular,
    //    fontSize: theme.typography.pxToRem(18),
    maxWidth: 100,
    minWidth: 90,
    marginRight: theme.spacing(1),
    padding: 0,
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

const Sidebar = () => {
  const [tab, setTab] = useState('Chats');

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Grid item>// profile</Grid>
      <Grid item>
        <StyledTabs value={tab} onChange={changeTab} aria-label="styled tabs">
          <StyledTab value="Chats" label="Chats" />
          <StyledTab value="Contacts" label="Contacts" />
          <StyledTab value="Invites" label="Invites" />
        </StyledTabs>
      </Grid>
    </Box>
  );
};

export default Sidebar;
