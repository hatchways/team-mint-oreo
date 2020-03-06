import Client from '../HTTPClient';

const updateChatLocation = async (msgObject, dispatch, activeChatId, chatsList) => {
  const { chatId } = msgObject;
  console.log(`received msg in sidebar for chat ${chatId}`);
  if (chatId === activeChatId) return; // take this out when implementing statusMsg/secondary
  // updates location of chat in chatsList
  const chatroomIndex = chatsList.findIndex(chatroom => chatroom.chatId === chatId);
  if (chatroomIndex < 0) {
    console.log('chat not found, retrieving from database');
    const chatroom = await Client.request(`/chat/data/${chatId}`); // TODO fix data returned from this route
    dispatch({ type: 'APPEND_TO_CHATLIST', payload: chatroom });
  } else {
    const newChatList = [...chatsList];
    const updatedChat = newChatList.splice(chatroomIndex, 1)[0];
    updatedChat.unreadMessages += 1;
    newChatList.unshift(updatedChat);
    dispatch({ type: 'SET_CHATS', payload: newChatList });
  }
};

const sidebar = {
  updateChatLocation,
};

export default sidebar;
