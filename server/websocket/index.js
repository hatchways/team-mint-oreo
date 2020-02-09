const socketio = require('socket.io');

const userLogin = (id, userInfo) => {
  console.log('Handling user login', id, userInfo);
  // handle work here or make a request to an http route ?

  // handle auth
  // attach active socket.id to user document
  // get friend list from db
  // get active chat ids from db
  // join socket rooms of chat
  // return info to frontend
};

const userDisconnect = () => {
  // remove socket.id from user document
};

const handleSocket = (server) => {
  const io = socketio.listen(server);
  io.on('connection', (socket) => {
    console.log(`${socket.id} has connected to the site.`);

    socket.on('login', (userInfo) => {
      userLogin(socket.id, userInfo);
    });
  });

  io.on('disconnect', (socket) => {
    console.log(`${socket.id} has left the site.`);
  });
};

module.exports = {
  listen: handleSocket,
};
