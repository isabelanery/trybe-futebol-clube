import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/user.model';
const UserMock = require('./mock/models/Users.json');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(UserMock.findOne as unknown as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })
  
  it('A requisição POST para rota inicial retorna um objeto com a chave "token"', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user', 
      });

    expect(chaiHttpResponse).to.have.property('token');
  });

  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });
});
