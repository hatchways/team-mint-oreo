import React from 'react';

import TabPanel from '../tabs-panel/tabs-panel.component';
import { TabNames } from '../../components/tabs/tabs.component';
import ProfileWithBorder from '../profile/profile-with-border.container';
import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid, Box } from '@material-ui/core';

const SidebarTabPanel = ({ value, index, profilesList }) => {
  const handleClick = () => {};

  return (
    <TabPanel {...{ value, index }} p={1} paddingBottom={0}>
      <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
        {profilesList.map(profile => {
          /*
        profileFormat: {
          id: string/integer, 
          name: string, 
          secondary: string, 
          avatar: Object, 
          ...others
        }
        */

          if (value === TabNames.CHATS)
            return (
              <Grid item key={profile.id}>
                <ProfileAsButton id={profile.id} {...profile} />
              </Grid>
            );
          else
            return (
              <Grid item key={profile.id}>
                <ProfileWithBorder id={profile.id} {...profile} />
              </Grid>
            );
        })}
      </Grid>
    </TabPanel>
  );
};

export default SidebarTabPanel;
