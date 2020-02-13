const db = require('../controllers');

const createUsers = async () => {
  const NUM_OF_USERS = 10;
  const languages = ['english', 'french', 'korean', 'chinese', 'spanish'];
  for (let i = 0; i < NUM_OF_USERS; i++) {
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const user = {
      email: `testUser${i}@gmail.com`,
      password: '1234',
      displayName: `testUser${i}`,
      language: randomLanguage,
    };
    db.user.createUser(user);
  }
};

const createMessages = async () => {
  const message = { chatId: 'test', userId: 'test', originalText: 'test' };
};

const createChatrooms = async idPair => {
  const chatId = db.chatroom.createChatroom(idPair);
  return chatId;
};

const makeFriends = async idPair => {};

const getAllUsers = async () => {
  const users = await db.user.getAllUsers();
  // console.log(users);
  return users;
};

module.exports = {
  createUsers,
  createMessages,
  createChatrooms,
  getAllUsers,
};
