import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
// import JwtService from 'src/services/jwt.service';

export default class Validate {
  static async login(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(user);

    if (error) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }

    next();
  }
}
