const expect = require('chai').expect;
const dbHandler = require('./db-handler');

const User = require('../models/User');
const {
  createUser,
  addChatById,
  addInvitationById,
  addFriend,
  getByEmail,
  getById,
  getFriendsById,
  getChatsById,
  getFieldById,
  setSocketIdById,
  clearSocketId,
  getFriendsSocketsById,
  getAllUsers,
  removeInvitation,
  getFriendsFieldsById,
} = require('../controllers/UserController');

describe('userModel', () => {
  it('should be invalid if email is empty', done => {
    const u = new User();

    u.validate(error => {
      expect(error.errors.email).to.exist;
      done();
    });
  });
});

describe('UserModel', () => {
  before(async () => {
    await dbHandler.connect();
  });
  beforeEach(() => {});
  afterEach(async () => {
    await dbHandler.clearDatabase();
  });
  after(async () => {
    await dbHandler.closeDatabase();
  });
  describe('User Creation', () => {
    it('should be created successfully', async () => {
      expect(async () => await User.create(exampleUser1)).not.to.throw();
    });
    it('should call createUser successfully', async () => {
      const user = await createUser(exampleUser2);
      expect(() => user).not.to.throw();
      expect(user).to.have.property('friends');
      expect(user).to.have.property('language');
      expect(user).to.have.property('chatrooms');
      expect(user).to.have.property('pendingInvitations');
      expect(user).to.have.property('_id');
      expect(user).to.have.property('email');
      expect(user.email).to.eql(exampleUser2.email);
      expect(user).to.have.property('password');
      expect(user).to.have.property('createdAt');
      expect(user).to.have.property('updatedAt');
    });
  });
});

const exampleUser1 = {
  email: 'example1@example.com',
  password: '12345',
  confirmPassword: '12345',
};

const exampleUser2 = {
  email: 'example2@example.com',
  password: '123456788',
  confirmPassword: '123456788',
};
