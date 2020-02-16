import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import { store as directoryStore } from '../../store/directory/directory.provider';
import ChatHeader from '../chat-header/chat-header.component';
import MessageField from '../message-field/message-field.component';
import ChatMessages from '../chat-messages/chat-messages.component';
import sizeMe from 'react-sizeme';
import { useClientRect } from '../../utils/react-utils';

const ChatFrame = ({ size, socket, userId }) => {
  // header box = hRect
  const [hRect, hRef] = useClientRect();
  // message text sender box = mRect
  const [mRect, mRef] = useClientRect();

  const makeHeightsList = () => {
    const list = [
      size.height,
      hRect !== null ? -hRect.height : null,
      mRect !== null ? -mRect.height : null,
      -50,
    ];
    return list;
  };

  const calculateHeights = heights =>
    heights.reduce(
      (accumulator, currentElement) =>
        currentElement !== null && accumulator + Math.round(currentElement),
      0
    );

  const {
    state: { currentlyActive: chatId },
  } = useContext(directoryStore);

  const [messages, setMessage] = useState([]);
  const [showOriginalText, setShowOriginalText] = useState(false);
  useEffect(() => {
    // check front end cache for stored conversation
    // if not cached, get messages from db

    // const msgObject = {
    //   userId, // of sender
    //   originalText,
    //   translations: {
    //     'english': 'asdf',
    //     'spanish': 'asdf'
    //   },
    //   timestamp
    // }
    socket.on('receiveMsg', msg => {
      console.log('msg received!', msg);
    });

    console.log('chatid is', chatId);
  }, [chatId]);

  return (
    <Box height={'100vh'} overflow={'hidden'}>
      <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
        <Grid item>
          <Box ref={hRef}>
            <ChatHeader changeText={setShowOriginalText} chatId={chatId} />
          </Box>
        </Grid>
        <Grid item>
          <Box paddingLeft={1}>
            <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
              <Grid item>
                <ChatMessages
                  messages={messages}
                  showOriginalText={showOriginalText}
                  userId={userId}
                  height={calculateHeights(makeHeightsList())}
                />
              </Grid>
              <Grid item>
                <Box ref={mRef}>
                  <MessageField emit={socket.emit} chatId={chatId} userId={userId} />
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
