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
  describe('Quando bem sucedida', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(UserMock.findOne as UserModel);
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
        
      expect(chaiHttpResponse.body).to.have.property('token');
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
  
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse).to.have.status(400);
    });
    
    it('A requisição deve conter o campo "password"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: '', 
        });
  
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse).to.have.status(400);
    });
    
  it('Não é possível fazer o login com uma senha inválida', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'test_user', 
      });

    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
    expect(chaiHttpResponse).to.have.status(401);
  });
  });
  
  describe('Quando o email é inválido', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(null);
    });
  
    after(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('Não é possível fazer o login com um email inválido', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@test.com',
          password: 'secret_user', 
        });

      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
      expect(chaiHttpResponse).to.have.status(401);
    });
  });

  
});

describe('/login/validate', () => {
  let chaiHttpResponse: Response;
  
  it('A requisição GET para rota inicial retorna um objeto com a chave "role"', async () => {
    const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDkxOTU0OCwiZXhwIjoxNjYxMTc4NzQ4fQ.kTcGKOf91qiKwvMUmqy5A7skNSQAUBtL1XPI_eGQhT8";
    chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', tokenMock)
      
    expect(chaiHttpResponse.body).to.have.property('role');
    expect(chaiHttpResponse.body.role).to.equal('user');
  });
  
  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Caso o token enviado seja inválido, a requisição retorna um objeto com a mensagem de erro', async () => {
    const tokenMock = "token";
    chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', tokenMock)
      
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Invalid token');
    expect(chaiHttpResponse).to.have.status(401);
  });
});