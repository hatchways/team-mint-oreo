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
  const foundRooms = format.chatroomData(chatroomData, unreadMessages);

  return foundRooms;
};

const searchFriends = async (searchParam, userId) => {
  const { friends = [] } = await db.user.searchByName(searchParam, userId);
  console.log('*****', friends);
  const friendsDmIds = await Promise.all(
    friends.map(friend => {
      return db.chatroom.getDmIdOfUsers(userId, friend.id);
    })
  );
  const formattedFriends = format.friendsData(friends, friendsDmIds);
  console.log(formattedFriends);
  return formattedFriends;
};

const search = async body => {
  const { tab, searchParam, userId } = body;
  let result;
  // CONTACTS
  // Search users controller by ID -> friendsList
  // populate friendsList -> search displayName by param;

  // in single query: search all users by name where userId is in friends

  // CHATS
  // - find all chats belonging to userId, -> chatIDList;
  // - search chats, populate users => search displayName of users in that chat

  // in a single query: search all users by displayName where chatID is in chatrooms of UserID
  // get all userID's chatrooms, populate users, search by displayName

  if (tab === 'Chats') {
    result = await searchChats(searchParam, userId);
  } else if (tab === 'Contacts') {
    result = await searchFriends(searchParam, userId);
  }

  return result;
};

module.exports = { search };
