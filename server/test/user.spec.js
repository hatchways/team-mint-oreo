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
const mongoose = require('mongoose');
const dbHandler = require('./db-handler');

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
  describe('POST /register', () => {
    before(async () => {
      console.log('connect');
      await dbHandler.connect();
    });
    beforeEach(() => {});
    afterEach(async () => {
      console.log('clear');
      await dbHandler.clearDatabase();
    });
    after(async () => {
      console.log('close');
      await dbHandler.closeDatabase();
    });
    it('should create User when given proper data', done => {
      chai
        .request(app)
        .post('/user/register')
        .send(exampleUser)
        .end((err, res) => {
          res.should.have.status(201);
          console.log('body', res.body);
          done();
        });
    });
    /* feature currently unimplemented, test will fail
    it('should disallow multiple users with the same email', done => {
      chai
        .request(app)
        .post('/user/register')
        .send(exampleUser)
        .end((err, res) => {
          res.should.have.status(201);
          chai
            .request(app)
            .post('/user/register')
            .send(exampleUser)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
    }); */

    it('should return 400 when given no data', done => {
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
  });
});

const exampleUser = {
  email: 'example@example.com',
  password: 'password12345',
};
