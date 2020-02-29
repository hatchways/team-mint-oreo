import React, { useEffect, useContext, useReducer, useMemo, useRef } from 'react';
import { Box, Grid } from '@material-ui/core';
import { store as directoryStore } from '../../store/directory/directory.provider';
import ChatHeader from '../chat-header/chat-header.component';
import MessageField from '../message-field/message-field.component';
import TypingStatus from '../chat-typing-status/typing-status.component';
import ChatMessages from '../chat-messages/chat-messages.component';
import Client from '../../utils/HTTPClient';
import { useStyles } from './chat-frame.styles';

const initialState = {
  messages: [],
  showOriginalText: false,
  isLoading: true,
  usersMap: {},
  isTypingMap: {},
};

const reducer = (state, action) => {
  switch (action.type) {
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
      return { ...state, usersMap: action.payload };
    case 'SET_TYPING_STATUS': {
      const { typerId, status } = action.payload;
      const { usersMap } = state;
      const typer = usersMap[typerId];
      const toggledUser = { ...typer, isTyping: status };

      return {
        ...state,
        usersMap: { ...usersMap, [typerId]: toggledUser },
        isTypingMap: { ...state.isTypingMap, [typerId]: typer.displayName },
      };
    }
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
  const { messages, showOriginalText, isLoading, usersMap } = state;
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    const getMessages = async () => {
      // if not cached, get messages from db
      const { messages: data = [] } = await Client.request(`/chat/messages/${chatId}`);
      console.log('Chatframe data fetch: ', data);
      dispatch({ type: 'SET_MESSAGES', payload: data }, { type: 'DONE_LOADING' });
      const chatUsers = chatsList.find(chat => chat.chatId === chatId).users;
      const usersMap = chatUsers.reduce((a, user) => ({ ...a, [user._id]: user }), {});
      dispatch({ type: 'SET_USERS', payload: usersMap });
    };

    try {
      dispatch({ type: 'IS_LOADING' });
      getMessages();
    } catch (err) {
      // TODO: handle error
      dispatch({ type: 'DONE_LOADING' });
    }
  }, [chatId, chatsList]);

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
  }, [chatId, socket, messages]);

  useEffect(() => {
    const handleTyping = obj => {
      const { userId: typerId, status } = obj;
      if (status) console.log(typerId, 'is typing');
      else console.log(typerId, 'has stopped typing');
      if (obj.chatId !== chatId || typerId === userId) return;
      dispatch({ type: 'SET_TYPING_STATUS', payload: { typerId, status } });
    };
    socket.on('typingStatus', handleTyping);

    return () => {
      socket.off('typingStatus', handleTyping);
    };
  }, [chatId, socket]);

  const memoMessages = useMemo(() => messages, [messages]);
  const memoUsers = useMemo(() => usersMap, [usersMap]);
  return (
    <Box
      maxHeight="100vh"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      onClick={() => Client.updateChatActivity(userId, chatId)}
    >
      <ChatHeader toggleText={dispatch} chatId={chatId} users={memoUsers} />
      <ChatMessages
        messages={memoMessages}
        showOriginalText={showOriginalText}
        userId={userId}
        className={classes.messageBoxHeight}
        language={language}
        users={memoUsers}
      />
      <MessageField socket={socket} chatId={chatId} userId={userId} />
      <TypingStatus className={classes.typingStatus} users={memoUsers} />
    </Box>
  );
};

export default React.memo(ChatFrame);
