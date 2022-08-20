import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';

export default class matchesController {
  static async list(_req: Request, res: Response) {
    const matches = await MatchesService.list();

    res.status(StatusCodes.OK).json(matches);
  }

  static async listInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    console.log(inProgress);

    const bool = inProgress === 'true';
    const matches = await MatchesService.listInProgress(bool);

    res.status(StatusCodes.OK).json(matches);
  }

  static async create(req: Request, res: Response) {
    const newMatch = req.body;

    const createdMatch = await MatchesService.create(newMatch);

    res.status(StatusCodes.CREATED).json(createdMatch);
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;

    await MatchesService.finish(+id);

    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const matches = await MatchesService.findById(+id);

    res.status(StatusCodes.OK).json(matches);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const match = await MatchesService.update({ id: +id, homeTeamGoals, awayTeamGoals });

    res.status(StatusCodes.OK).json(match);
  }
}
