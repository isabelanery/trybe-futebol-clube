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
    expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
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

// describe('/teams/:id', async () => {
//   let chaiHttpResponse: Response;

//   before(async () => {
//     sinon
//       .stub(TeamModel, "findByPk")
//       .resolves(LeaderboardMock.findByPk as unknown as TeamModel);
//   });

//   after(()=>{
//     (TeamModel.findByPk as sinon.SinonStub).restore();
//   })
  
//   it('A requisição GET para rota inicial retorna um objetos', async () => {
//     chaiHttpResponse = await chai.request(app)
//       .get('/teams/1')

//     expect(chaiHttpResponse.body).to.have.property('teamName');
//     expect(chaiHttpResponse.body.teamName).to.equal('Avaí/Kindermann');
//   });
  
//   it('Essa requisição deve retornar código de status 200', async () => {
//     expect(chaiHttpResponse).to.have.status(200);
//   });

// });
