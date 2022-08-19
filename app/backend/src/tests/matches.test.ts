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

describe('/matches', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(MatchesMock.list as unknown as MatchesModel[]);
  });

  after(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
  
  it('A requisição GET para rota inicial retorna um array de objetos', async () => {
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

describe('/matches?inProgress=false', async () => {
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
      .get('/matches?inProgress=false');

    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
    expect(chaiHttpResponse.body[0].inProgress).to.equal(false);
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });

});
