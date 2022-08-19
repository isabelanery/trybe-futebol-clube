import Match from '../interfaces/match.interface';
import Matches from '../database/models/matches.model';
import Team from '../database/models/team.model';

export default class MatchesService {
  static async list(): Promise<Match[]> {
    const matches = await Matches.findAll({
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });

    return matches as Match[];
  }

  // static async findById(id: number): Promise<Team> {
  //   const team = await Matches.findByPk(id);

  //   return team as Team;
  // }
}
