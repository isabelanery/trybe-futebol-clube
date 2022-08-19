import bcrypt = require('bcryptjs');
import UserModel from '../database/models/user.model';
import JwtService from './jwt.service';

export default class UserService {
  static async login({ email, password }
  : { email: string, password: string }): Promise<string> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      const e = new Error('Incorrect email or password');
      e.name = 'Unauthorized';
      throw e;
    }

    const { password: passwordHash, username, role } = user;

    if (!bcrypt.compareSync(password, passwordHash)) {
      const e = new Error('Incorrect email or password');
      e.name = 'Unauthorized';
      throw e;
    }

    const token = await JwtService.createToken({ username, email, role });

    return token;
  }

  static validateLogin(token: string): string {
    const { role } = JwtService.validateToken(token);

    return role;
  }
}
