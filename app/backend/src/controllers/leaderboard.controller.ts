import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async listAllMatches(_req: Request, res: Response) {
    const teams = await LeaderBoardService.listAllMatches();

    res.status(StatusCodes.OK).json(teams);
  }

  static async listHomeMatches(_req: Request, res: Response) {
    const teams = await LeaderBoardService.listHomeMatches();

    res.status(StatusCodes.OK).json(teams);
  }

  static async listAwayMatches(_req: Request, res: Response) {
    const teams = await LeaderBoardService.listAwayMatches();

    res.status(StatusCodes.OK).json(teams);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await LeaderBoardService.findById(+id);

    res.status(StatusCodes.OK).json(team);
  }
}
