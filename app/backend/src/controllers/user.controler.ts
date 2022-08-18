import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = UserService.validateLogin({ email, password });

    res.status(StatusCodes.OK).json({ token });
  }
}
