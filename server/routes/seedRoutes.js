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

module.exports = router;
