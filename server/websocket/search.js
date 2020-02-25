const db = require('../controllers');

const search = async body => {
  const { tab, searchParam, userId } = body;

  // CONTACTS
  // Search users controller by ID -> friendsList
  // populate friendsList -> search displayName by param;

  // in single query: search all users by name where userId is in friends

  // CHATS
  // - find all chats belonging to userId, -> chatIDList;
  // - search chats, populate users => search displayName of users in that chat

  // in a single query: search all users by displayName where chatID is in chatrooms of UserID
  // get all userID's chatrooms, populate users, search by displayName

  switch (tab) {
    case 'Chats': {
      const chatIds = await db.user.getChatsIdsById(userId, 0);
      console.log(chatIds);
      return db.chatroom.searchForUserBy(searchParam, 'displayName', chatIds);
    }
    case 'Contacts':
      return db.user.searchByName(searchParam, userId);
    case 'Invites':
      break;
    default:
      throw new Error();
  }
};

module.exports = { search };
