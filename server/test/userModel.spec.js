var expect = require('chai').expect;
const mongoose = require('mongoose');
const dbHandler = require('./db-handler');

var User = require('../models/User');

describe('user', () => {
  it('should be invalid if email is empty', done => {
    const u = new User();

    u.validate(error => {
      expect(error.errors.email).to.exist;
      done();
    });
  });
});

describe('createUser', () => {
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
  it('should be created successfully', async () => {
    expect(
      async () =>
        await User.create({
          email: 'example@example.com',
          password: 'password1234',
        })
    ).not.to.throw();
  });
});
