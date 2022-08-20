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
    const newMatch: Match = await Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return newMatch as Match;
  }

  // static async findById(id: number): Promise<Team> {
  //   const team = await Matches.findByPk(id);

  //   return team as Team;
  // }
}
