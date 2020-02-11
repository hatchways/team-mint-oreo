import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import sizeMe, { SizeMe } from 'react-sizeme';

import ChatHeader from '../chat-header/chat-header.component';
import MessageField from '../message-field/message-field.component';
import ChatMessages from '../chat-messages/chat-messages.component';

const ChatFrame = ({ size }) => {
  // header box = hRect
  const [hRect, hRef] = useClientRect();
  // message text sender box = mRect
  const [mRect, mRef] = useClientRect();

  const makeHeightsList = () => {
    const list = [
      size.height,
      hRect !== null ? -hRect.height : null,
      mRect !== null ? -mRect.height : null,
      -40,
    ];
    console.log(list);
    return list;
  };

  return (
    <Box height={'100vh'} paddingLeft={1} paddingRight={1}>
      <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
        <Grid item>
          <ChatHeader getChildRect={hRef} />
        </Grid>
        <Grid item>
          <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
            <Grid item>
              <ChatMessages heights={makeHeightsList()} />
            </Grid>
            <Grid item>
              <MessageField getChildRect={mRef} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const useClientRect = () => {
  const [rect, setRect] = React.useState(null);
  const ref = React.useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
};

export default sizeMe({ monitorHeight: true })(ChatFrame);
