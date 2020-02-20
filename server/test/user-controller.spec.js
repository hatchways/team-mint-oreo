const sinon = require('sinon');
const UserController = require('../controllers/UserController');
const User = require('../models/User');

describe('User Controller', function() {
  const req = {
    body: {
      email: 'example1@example.com',
      password: '12345',
      language: 'english',
    },
  };
  const res = {};
  const expectedResult = {};

  describe('create', () => {
    beforeEach(() => {
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() }),
      };
    });
    it(
      'should return created object',
      sinon.test(() => {
        expectedResult = req.body;
        this.stub(User, 'createUser').yields(null, expectedResult);
        UserController.createUser(req.body);
        sinon.assert.calledWith(User.createUser, req.body);
      })
    );
  });
});
