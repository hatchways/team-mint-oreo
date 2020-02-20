const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const sinon = require('sinon');
sinon.stub(console, 'log');

const app = require('../app.js');

describe('ROUTE /user/', () => {
  describe('GET /register', () => {
    it('should return 404', done => {
      chai
        .request(app)
        .get('/user/register')
        .send()
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('Object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('Object');
          res.body.error.should.have.property('message').eql('Not Found');
          done();
        });
    });
  });
});
