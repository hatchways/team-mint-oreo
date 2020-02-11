import React from 'react';

import TabPanel from '../tabs-panel/tabs-panel.component';
import ProfileWithBorder from '../profile/profile-with-border.container';

const SidebarTabPanel = ({ value, index, profilesList }) => {
  return (
    <TabPanel {...{ value, index }}>
      <ProfileWithBorder name={'name'} secondaryText={'Secondary Text'} notifications={2} />
    </TabPanel>
  );
};

export default SidebarTabPanel;
