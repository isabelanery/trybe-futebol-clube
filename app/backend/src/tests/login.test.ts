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

      console.log(chaiHttpResponse.body);
      
    expect(chaiHttpResponse).to.have.property('token');
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });
  
  it('A requisição deve conter o campo "email"', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: '',
        password: 'secret_user', 
      });

    expect(chaiHttpResponse).to.have.property('message');
    expect(chaiHttpResponse).to.have.status(400);
  });
  
  it('A requisição deve conter o campo "password"', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: '', 
      });

    expect(chaiHttpResponse).to.have.property('message');
    expect(chaiHttpResponse).to.have.status(400);
  });
  
  it('Não é possível fazer o login com um email inválido', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@test.com',
        password: 'secret_user', 
      });

    expect(chaiHttpResponse).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
    expect(chaiHttpResponse).to.have.status(401);
  });
  
  it('Não é possível fazer o login com uma senha inválida', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'test_user', 
      });

    expect(chaiHttpResponse).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
    expect(chaiHttpResponse).to.have.status(401);
  });
});
