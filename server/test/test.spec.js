const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
chai.should();
chai.use(chaiHttp);

describe('/test', () => {
  describe('GET', () => {
    it('it should return JSON', done => {
      chai
        .request(app)
        .get('/test/')
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.should.have.property('id');
          res.body.id.should.be.a('integer');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.should.have.property('child');
          res.body.child.should.be.a('Object');
          done();
        });
    });
  });
});

/*
describe('/POST ping', () => {
  it('it should return 400', done => {
    chai
      .request(app)
      .post(`/ping/`)
      .send({ teamName: 'Shums' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('response')
          .eql('Shums is not part of the team. Modify your .env');
        done();
      });
  });
});
*/
