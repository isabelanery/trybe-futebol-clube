import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import User from '../interfaces/user.interface';

const jwtSecret: string = process.env.JWT_SECRET || 'dev';

export default class JwtService {
  static createToken = (payload: User): string => {
    const { password, ...data } = payload;

    const token = jwt.sign(data, jwtSecret, {
      algorithm: 'HS256',
      expiresIn: '3d',
    });

    return token;
  };

  static validateToken = (token: string): JwtPayload => {
    try {
      const data = jwt.verify(token, jwtSecret);

      return data as JwtPayload;
    } catch (_err) {
      const e = new Error('Invalid token');
      e.name = 'Unauthorized';
      throw e;
    }
  };
}
