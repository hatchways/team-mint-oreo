const router = require('express').Router();
const db = require('../controllers');

router.get('/rooms', async (req, res) => {
  const { userId } = res.locals;
  db.chatroom.seedRooms(userId);
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
  console.log(friendIds);

  for (let i = 0; i < 10; i++) {
    db.user.addFriend(userId, friendIds[i]);
  }
});

module.exports = router;
