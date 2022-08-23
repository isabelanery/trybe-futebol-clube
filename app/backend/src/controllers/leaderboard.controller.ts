import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async list(_req: Request, res: Response) {
    const teams = await LeaderBoardService.list();

    res.status(StatusCodes.OK).json(teams);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await LeaderBoardService.findById(+id);

    res.status(StatusCodes.OK).json(team);
  }
}
