import bcrypt = require('bcryptjs');
import UserModel from '../database/models/user.model';
import JwtService from './jwt.service';

export default class UserService {
  static async validateLogin({ email, password }
  : { email: string, password: string }): Promise<string> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      const e = new Error('Incorrect email or password');
      e.name = 'Unauthorized';
      throw e;
    }

    const { password: passwordHash, username } = user;

    if (!bcrypt.compareSync(password, passwordHash)) {
      const e = new Error('Incorrect email or password');
      e.name = 'Unauthorized';
      throw e;
    }

    const token = await JwtService.createToken({ username, email });

    return token;
  }
}
