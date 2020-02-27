import React from 'react';

import TabPanel from '../tabs-panel/tabs-panel.component';

const SidebarTabPanel = ({ value, index, children }) => {
  return (
    <TabPanel {...{ value, index }} p={1}>
      {children}
    </TabPanel>
  );
};

export default SidebarTabPanel;
