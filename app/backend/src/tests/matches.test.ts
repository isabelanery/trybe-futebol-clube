import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/matches.model';
const MatchesMock = require('./mock/models/Matches.json');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('/matches', async () => {
  describe('GET', () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(MatchesMock.list as unknown as MatchesModel[]);
    });
  
    after(()=>{
      (MatchesModel.findAll as sinon.SinonStub).restore();
    })
    
    it('A requisição para rota inicial retorna um array de objetos', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/matches');
      
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
    });
    
    it('Essa requisição deve retornar código de status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });

  describe('POST', () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "create")
        .resolves(MatchesMock.create as unknown as MatchesModel);
    });
  
    after(()=>{
      (MatchesModel.create as sinon.SinonStub).restore();
    })
    
      it('A requisição para rota inicial retorna um de objetos com o id da partida cadastrada', async () => {
        const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDkxOTU0OCwiZXhwIjoxNjYxMTc4NzQ4fQ.kTcGKOf91qiKwvMUmqy5A7skNSQAUBtL1XPI_eGQhT8";
    
        chaiHttpResponse = await chai.request(app)
          .post('/matches')
          .send({
            homeTeam: 16,
            awayTeam: 8,
            homeTeamGoals: 2,
            awayTeamGoals: 2
          })
          .set('Authorization', tokenMock);
    
        expect(chaiHttpResponse.body).to.have.property('id');
        expect(chaiHttpResponse.body).to.have.property('inProgress');
        expect(chaiHttpResponse.body.inProgress).to.equal(true);
      });
      
      it('Essa requisição deve retornar código de status 200', async () => {
        expect(chaiHttpResponse).to.have.status(200);
      });
  });
});

describe('/matches/search?inProgress=false', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(MatchesMock.listInProgress as unknown as MatchesModel[]);
  });

  after(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
  
  it('A requisição GET para rota inicial retorna um array de objetos', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/matches/search?inProgress=false');

    expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
    expect(chaiHttpResponse.body[0].inProgress).to.equal(false);
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });
  
});

describe('/:id', () => {

  describe('PATCH', () => {
    it('A requisição para rota inicial retorna um de objetos com o id da partida cadastrada', async () => {
      const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDkxOTU0OCwiZXhwIjoxNjYxMTc4NzQ4fQ.kTcGKOf91qiKwvMUmqy5A7skNSQAUBtL1XPI_eGQhT8";
  
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/7')
        .send({
          homeTeamGoals: 4,
          awayTeamGoals: 2
        })
        .set('Authorization', tokenMock);
  
      expect(chaiHttpResponse.body).to.have.property('id');
      expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
      expect(chaiHttpResponse.body.inProgress).to.equal(4);
    });
    
    it('Essa requisição deve retornar código de status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
});

describe('/matches/:id/finish', () => {

});