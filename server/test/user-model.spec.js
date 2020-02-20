const expect = require('chai').expect;
const User = require('../models/User');

describe('UserModel', () => {
  it('should be invalid if email is empty', done => {
    const u = new User();

    u.validate(error => {
      expect(error.errors.email).to.exist;
      done();
    });
  });
});
