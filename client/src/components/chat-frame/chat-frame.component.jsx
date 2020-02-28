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
  usersList: [],
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
    case 'SET_USERS':
      return { ...state, usersList: action.payload };
    default:
      throw new Error();
  }
};

const ChatFrame = ({ socket, userId }) => {
  const classes = useStyles();

  const {
    state: { activeChatId: chatId, language, chatsList },
  } = useContext(directoryStore);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { messages, showOriginalText, isLoading, usersList } = state;

  useEffect(() => {
    if (!chatId) return;
    const getMessages = async () => {
      // if not cached, get messages from db
      const { messages: data = [] } = await Client.request(`/chat/messages/${chatId}`);
      console.log('Chatframe data fetch: ', data);
      dispatch({ type: 'SET_MESSAGES', payload: data }, { type: 'DONE_LOADING' });
      const chatUsers = chatsList.find(chat => chat.chatId === chatId).users;
      dispatch({ type: 'SET_USERS', payload: chatUsers });
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
      if (msg.chatId === chatId) {
        dispatch({ type: 'ADD_MESSAGE', payload: msg });
      }
    };

    socket.on('receiveMsg', updateMessages);
    return () => {
      socket.off('receiveMsg', updateMessages);
    };
  }, [chatId, socket]);

  const memoMessages = useMemo(() => messages, [messages]);
  const memoUsers = useMemo(() => usersList, [usersList]);
  return (
    <Box
      maxHeight="100vh"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      onClick={() => Client.updateChatActivity(userId, chatId)}
    >
      <ChatHeader toggleText={dispatch} chatId={chatId} />
      <ChatMessages
        messages={memoMessages}
        showOriginalText={showOriginalText}
        userId={userId}
        className={classes.messageBoxHeight}
        language={language}
        users={memoUsers}
      />
      <MessageField socket={socket} chatId={chatId} userId={userId} />
    </Box>
  );
};

export default React.memo(ChatFrame);
