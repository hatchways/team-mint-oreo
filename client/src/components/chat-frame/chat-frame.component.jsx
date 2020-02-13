import React from 'react';
import { Box, Grid } from '@material-ui/core';
import sizeMe from 'react-sizeme';

import { useClientRect } from '../../utils/react-utils';

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
    return list;
  };

  const calculateHeights = heights =>
    heights.reduce(
      (accumulator, currentElement) =>
        currentElement !== null && accumulator + Math.round(currentElement),
      0
    );

  return (
    <Box height={'100vh'} paddingRight={1}>
      <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
        <Grid item>
          <Box ref={hRef}>
            <ChatHeader />
          </Box>
        </Grid>
        <Grid item>
          <Box paddingLeft={1}>
            <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
              <Grid item>
                <ChatMessages height={calculateHeights(makeHeightsList())} />
              </Grid>
              <Grid item>
                <Box ref={mRef}>
                  <MessageField />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default sizeMe({ monitorHeight: true })(ChatFrame);
