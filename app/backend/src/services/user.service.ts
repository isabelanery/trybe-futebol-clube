import bcrypt = require('bcryptjs');
import UserModel from '../database/models/user.model';
import JwtService from './jwt.service';

export default class UserService {
  static async validateLogin({ email, password }
  : { email: string, password: string }): Promise<string> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      throw e;
    }

    const { password: senha, ...userWithoutPassword } = user;

    const token = await JwtService.createToken(userWithoutPassword);

    return token;
  }
}
