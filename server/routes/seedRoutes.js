const router = require('express').Router();
const db = require('../controllers');

router.get('/rooms', async (req, res) => {
  const { userId } = res.locals;
  const { friends } = await db.user.getFriendsFieldsById(userId, ['id']);
  console.log(friends[1]['_id']);
  for (let i = 0; i < 10; i++) {
    db.chatroom.createChatroom([userId, friends[i]['_id']]);
  }
});

router.get('/friends', async (req, res) => {
  // route to create friends
  const { userId } = res.locals;
  const queries = [];
  for (let i = 0; i < 10; i++) {
    queries.push(
      db.user.createUser({
        email: `fakeFriend${i}//${userId}@test.com`,
        password: '123',
        displayName: `fakeFriend${i}`,
      })
    );
  }
  const friends = await Promise.all(queries);
  const friendIds = friends.map(friend => friend.id);

  for (let i = 0; i < 10; i++) {
    db.user.addFriend(userId, friendIds[i]);
  }
});

router.get('/friendsToChat', async (req, res) => {
  const { userId } = res.locals;
  const friends = await db.user.getFriendsFieldsById('id', userId);
  const chatIds = await Promise.all(
    friends.map(friend => {
      return db.chatroom.createChatroom([userId, friend['_id']]);
    })
  );

  console.log('SEED, ADD FRIENDS TO CHAT', chatIds);

  Promise.all(
    chatIds.map(id => {
      return db.user.addChatById(userId, id);
    })
  );
});

router.post('/makeFriends', async (req, res) => {
  const { recipientId } = req.body;
  const { userId } = res.locals;
  db.user.addFriend(userId, recipientId);
  const chatId = await db.chatroom.createChatroom([userId, recipientId]);
  db.user.addChatById(userId, chatId);
  db.user.addChatById(recipientId, chatId);
});

module.exports = router;
