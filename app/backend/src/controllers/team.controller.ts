import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/team.service';

export default class TeamController {
  static async list(_req: Request, res: Response) {
    const teams = await TeamService.list();

    res.status(StatusCodes.OK).json(teams);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.findById(+id);

    res.status(StatusCodes.OK).json(team);
  }
}
