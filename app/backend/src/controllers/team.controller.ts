import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/team.service';

export default class TeamController {
  static async list(req: Request, res: Response) {
    const teams = await TeamService.list();

    res.status(StatusCodes.OK).json(teams);
  }
}
