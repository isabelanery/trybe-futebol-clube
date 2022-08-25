import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/team.model';
const LeaderboardMock = require('./mock/models/Leaderboard.json');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/leaderboard/', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(LeaderboardMock.listAllMatches as unknown as TeamModel[]);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })
  
  it('A requisição GET para rota inicial retorna um array de objetos', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/leaderboard/')

    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('name');
    expect(chaiHttpResponse.body[0].name).to.equal('Palmeiras');
    expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    expect(chaiHttpResponse.body[0].totalGames).to.equal(5);
    expect(chaiHttpResponse.body[0]).to.have.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.have.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.have.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.have.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.have.property('efficiency');
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('/leaderboard/home', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(LeaderboardMock.listHomeMatches as unknown as TeamModel[]);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })
  
  it('A requisição GET para rota inicial retorna um array de objetos', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/leaderboard/home')

    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('name');
    expect(chaiHttpResponse.body[0].name).to.equal('Santos');
    expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    expect(chaiHttpResponse.body[0].totalGames).to.equal(3);
    expect(chaiHttpResponse.body[0]).to.have.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.have.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.have.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.have.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.have.property('efficiency');
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('/leaderboard/away', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(LeaderboardMock.listAwayMatches as unknown as TeamModel[]);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })
  
  it('A requisição GET para rota inicial retorna um array de objetos', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/leaderboard/away')

    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('name');
    expect(chaiHttpResponse.body[0].name).to.equal('Palmeiras');
    expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    expect(chaiHttpResponse.body[0].totalGames).to.equal(2);
    expect(chaiHttpResponse.body[0]).to.have.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.have.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.have.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.have.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.have.property('efficiency');
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });
});
