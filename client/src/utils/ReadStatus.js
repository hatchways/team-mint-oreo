// eslint-disable-next-line max-classes-per-file
class Node {
  constructor(index, avatar, timestamp, id) {
    this.index = index;
    this.avatar = avatar;
    this.timestamp = timestamp;
    this.id = id;
  }
}

class ReadStatus {
  constructor(users, messages, userId) {
    this.messages = messages;
    this.data = this.formatUsers(users, userId);
    this.indexMap = {};
    this.idMap = {};
    this.users = users;
  }

  formatUsers = (userMap, _userId) => {
    return Object.keys(userMap).forEach(friendId => {
      const { lastActivity } = userMap[friendId];
      // if user has no activity or is current user move to next user
      if (!lastActivity || _userId === friendId) return;
      // find index of the first message after user's last activity
      let indexOfLastRead = this.messages.findIndex(
        message => Date.parse(message.createdAt) > lastActivity
      );
      // if user's last read is before the current batch of messages, continue to next user
      if (indexOfLastRead === 0) return;
      // if user's there are no messages timestamped after user's last activity( ie all messages are read)
      // then the last message is the user's last read
      if (indexOfLastRead === -1) {
        indexOfLastRead = this.messages.length - 1;
        // otherwise the last read message is the one right before user's last activity
      } else {
        indexOfLastRead -= 1;
      }

      const userAvatar = userMap[friendId].avatar;
      const userNode = new Node(indexOfLastRead, userAvatar, lastActivity, friendId);

      this.insertIndexMap(userNode);
      this.insertIdMap(userNode);
    });
  };

  insertIdMap(node) {
    this.idMap[node.id] = node;
  }

  insertIndexMap(node) {
    this.indexMap[node.index] = node;
  }

  updateUserActivity(userId) {}
}

export default ReadStatus;
