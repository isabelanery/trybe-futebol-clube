import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
// import MatchesService from '../services/matches.service';
import JwtService from '../services/jwt.service';
import TeamService from '../services/team.service';

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

  static async token(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      const e = new Error('Token not found');
      e.name = 'Unauthorized';
      throw e;
    }

    JwtService.validateToken(authorization);

    next();
  }

  static async teams(req: Request, _res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    await TeamService.findById(+homeTeam);
    await TeamService.findById(+awayTeam);

    next();
  }
}
