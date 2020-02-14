import React from 'react';

import { StyledTab, StyledTabs } from './tabs.styles';

const TabsComponent = ({ value, onChange }) => (
  <StyledTabs value={value} onChange={onChange} aria-label="styled tabs">
    <StyledTab value={TabNames.CHATS} label={TabNames.CHATS} />
    <StyledTab value={TabNames.CONTACTS} label={TabNames.CONTACTS} />
    <StyledTab value={TabNames.INVITES} label={TabNames.INVITES} />
  </StyledTabs>
);

export const TabNames = { CHATS: 'Chats', CONTACTS: 'Contacts', INVITES: 'Invites' };

export default TabsComponent;
