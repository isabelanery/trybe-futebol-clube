import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await UserService.login({ email, password });

    res.status(StatusCodes.OK).json({ token });
  }

  static async validateLogin(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      const e = new Error('Token not found');
      e.name = 'Unauthorized';
      throw e;
    }

    const role = UserService.validateLogin(authorization);

    res.status(StatusCodes.OK).json({ role });
  }
}
