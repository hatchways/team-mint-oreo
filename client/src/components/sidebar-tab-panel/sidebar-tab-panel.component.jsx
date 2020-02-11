import React from 'react';

import TabPanel from '../tabs-panel/tabs-panel.component';
import ProfileWithBorder from '../profile/profile-with-border.container';
import { Grid } from '@material-ui/core';

const SidebarTabPanel = ({ value, index, profilesList }) => {
  return (
    <TabPanel {...{ value, index }} p={1} paddingBottom={0}>
      <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
        {profilesList.map(profile => (
          /*
        profileFormat: {
          id: string/integer, 
          name: string, 
          secondary: string, 
          avatar: Object, 
          ...others
        }
        */
          <Grid item key={profile.id}>
            <ProfileWithBorder id={profile.id} {...profile} />
          </Grid>
        ))}
      </Grid>
    </TabPanel>
  );
};

export default SidebarTabPanel;
