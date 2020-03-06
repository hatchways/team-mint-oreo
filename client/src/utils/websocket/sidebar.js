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
    dispatch({ type: 'PREPEND_TO_CHATLIST', payload: chatroom });
  } else {
    const newChatList = [...chatsList];
    const updatedChat = newChatList.splice(chatroomIndex, 1)[0];
    updatedChat.unreadMessages += 1;
    newChatList.unshift(updatedChat);
    dispatch({ type: 'SET_CHATS', payload: newChatList });
  }
};

const updateFriendAvatar = (msgObject, friendsList, chatsList, dispatch) => {
  const { friendId, profilePic } = msgObject;
  const newFriendsList = friendsList.map(friend => {
    let { avatar } = friend;
    if (friend._id === friendId) {
      avatar = profilePic;
    }
    return {
      ...friend,
      avatar,
    };
  });
  dispatch({ type: 'SET_FRIENDS', payload: newFriendsList });
  // need to update chatrooms where this specific profile avatar was used
  const newChatroomsList = chatsList.map(room => {
    const friendIndex = room.users.findIndex(_user => _user.id === friendId);
    const updatedUsers = [...room.users];
    updatedUsers[friendIndex].avatar = profilePic;

    if (friendIndex >= 0) {
      return {
        ...room,
        avatar: profilePic,
        users: updatedUsers,
      };
    }
    return room;
  });

  dispatch({ type: 'SET_CHATS', payload: newChatroomsList });
  dispatch({ type: 'SET_CHAT_LIST', payload: newChatroomsList });
};

const sidebar = {
  updateChatLocation,
  updateFriendAvatar,
};

export default sidebar;
