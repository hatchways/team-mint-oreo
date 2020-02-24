import React, { useState, useEffect, useContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@material-ui/core';
import { store as directoryStore } from '../../store/directory/directory.provider';
import ChatHeader from '../chat-header/chat-header.component';
import MessageField from '../message-field/message-field.component';
import ChatMessages from '../chat-messages/chat-messages.component';
import Client from '../../utils/HTTPClient';
import { useStyles } from './chat-frame.styles';

const initialState = {
  messages: [],
  showOriginalText: false,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'TOGGLE_TRANSLATION':
      return { ...state, showOriginalText: !state.showOriginalText };
    case 'IS_LOADING':
      return { ...state, isLoading: true };
    case 'DONE_LOADING':
      return { ...state, isLoading: false };
    default:
      throw new Error();
  }
};

const ChatFrame = ({ socket, userId }) => {
  const classes = useStyles();

  const {
    state: { activeChatId: chatId, language },
  } = useContext(directoryStore);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { messages, showOriginalText, isLoading } = state;

  useEffect(() => {
    if (!chatId) return;
    const getMessages = async () => {
      // if not cached, get messages from db
      const { messages: data = [] } = await Client.request(`/chat/messages/${chatId}`);
      console.log('Chatframe data fetch: ', data);
      dispatch({ type: 'SET_MESSAGES', payload: data }, { type: 'DONE_LOADING' });
    };

    try {
      dispatch({ type: 'IS_LOADING' });
      getMessages();
    } catch (err) {
      // TODO: handle error
      dispatch({ type: 'DONE_LOADING' });
    }
  }, [chatId]);

  useEffect(() => {
    const updateMessages = msg => {
      console.log('Chatframe ID: ', chatId, 'msg ID: ', msg.chatId);
      if (msg.chatId === chatId) {
        dispatch({ type: 'ADD_MESSAGE', payload: msg });
      }
    };

    socket.on('receiveMsg', updateMessages);
    return () => {
      socket.off('receiveMsg', updateMessages);
    };
  }, [chatId]);

  const memoMessages = useMemo(() => messages, [messages]);

  return (
    <Box maxHeight="100vh" overflow="hidden">
      <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
        <Grid item>
          <ChatHeader toggleText={dispatch} chatId={chatId} />
        </Grid>
        <Grid item>
          <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
            <ChatMessages
              messages={memoMessages}
              showOriginalText={showOriginalText}
              userId={userId}
              className={classes.messageBoxHeight}
              language={language}
            />
            <MessageField socket={socket} chatId={chatId} userId={userId} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatFrame;
