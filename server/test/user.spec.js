const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
chai.should();
chai.use(chaiHttp);

describe('ROUTE /user/', () => {
  describe('GET /register', () => {
    it('it should return 404', done => {
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
  describe('POST /register', () => {
    it('it should return 400 when given no data', done => {
      chai
        .request(app)
        .post('/user/register')
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('Object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('Object');
          res.body.error.should.have.property('message').eql('Bad Request');
          done();
        });
    });
    it('it should return 400 when given bad data', done => {
      const data = {
        email: '',
      };
      chai
        .request(app)
        .post('/user/register')
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('Object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('Object');
          res.body.error.should.have.property('message').eql('Bad Request');
          done();
        });
    });
  });
});
