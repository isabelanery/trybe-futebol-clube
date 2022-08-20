import Match from '../interfaces/match.interface';
import Matches from '../database/models/matches.model';
import Team from '../database/models/team.model';

export default class MatchesService {
  static async list(): Promise<Match[]> {
    const matches = await Matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches as Match[];
  }

  static async listInProgress(inProgress: boolean): Promise<Match[]> {
    const matches = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches as Match[];
  }

  static async create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }: {
    homeTeam: number, homeTeamGoals: number, awayTeam: number, awayTeamGoals: number }) {
    const verifyMatch = await Matches.findAll({ where: { homeTeam, awayTeam } });

    if (verifyMatch.length > 0) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'Unauthorized';
      throw e;
    }

    const newMatch: Match = await Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return newMatch as Match;
  }

  static async findById(id: number): Promise<Match> {
    const match = await Matches.findByPk(id);

    if (!match) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFoundError';
      throw e;
    }
    return match as Match;
  }

  static async finish(id: number) {
    await this.findById(id);

    // if (!match) {
    //   const e = new Error('There is no team with such id!');
    //   e.name = 'NotFoundError';
    //   throw e;
    // }

    await Matches.update({ inProgress: false }, { where: { id } });
  }

  static async update({ id, homeTeamGoals, awayTeamGoals }
  : { id: number, homeTeamGoals: number, awayTeamGoals: number }) {
    await this.findById(id);

    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    const match = await this.findById(id);

    return match as Match;
  }
}
