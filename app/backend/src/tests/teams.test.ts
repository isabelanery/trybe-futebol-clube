import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/team.model';
const TeamMock = require('./mock/models/Teams.json');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(TeamMock.findAll as unknown as TeamModel[]);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })
  
  it('A requisição GET para rota inicial retorna um array de objetos', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/teams')

    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });

});

describe('/teams/:id', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamModel, "findByPk")
      .resolves(TeamMock.findByPk as unknown as TeamModel);
  });

  after(()=>{
    (TeamModel.findByPk as sinon.SinonStub).restore();
  })
  
  it('A requisição GET para rota inicial retorna um objetos', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/teams/1')

    expect(chaiHttpResponse.body).to.have.property('teamName');
    expect(chaiHttpResponse.body.teamName).to.equal('Avaí/Kindermann');
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });

});
