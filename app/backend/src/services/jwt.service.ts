import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret: string = process.env.JWT_SECRET || 'dev';

export default class JwtService {
  static createToken = (payload: { email: string, username: string, role: string }): string => {
    const token = jwt.sign(payload, jwtSecret, {
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
      const e = new Error('Token must be a valid token');
      e.name = 'Unauthorized';
      throw e;
    }
  };
}
