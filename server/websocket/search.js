const db = require('../controllers');
const format = require('../services/formatDataService');

const searchChats = async (searchParam, userId) => {
  const chatIds = await db.user.getChatsIdsById(userId, 0);
  const chatroomData = await db.chatroom.searchForRoomWithUser(searchParam, chatIds, userId);
  const unreadMessages = await Promise.all(
    chatroomData.map(chatroom => {
      return db.message.getUnreadCount(chatroom, userId);
    })
  );
  const foundRooms = format.chatroomData(chatroomData, unreadMessages, userId);
  console.log('FOUND ROOMS', foundRooms);
  return foundRooms;
};

const searchFriends = async (searchParam, userId) => {
  const { friends = [] } = await db.user.searchByName(searchParam, userId);
  const friendsDmIds = await Promise.all(
    friends.map(friend => {
      return db.chatroom.getDmIdOfUsers(userId, friend.id);
    })
  );
  const formattedFriends = format.friendsData(friends, friendsDmIds);
  return formattedFriends;
};

const search = async body => {
  const { tab, searchParam, userId } = body;
  let result;
  if (tab === 'Chats') {
    result = await searchChats(searchParam, userId);
  } else if (tab === 'Contacts') {
    result = await searchFriends(searchParam, userId);
  }

  return result;
};

module.exports = { search };
