import Match from '../interfaces/match.interface';
import Matches from '../database/models/matches.model';

export default class MatchesService {
  static async list(): Promise<Match[]> {
    const matches = await Matches.findAll();

    return matches as Match[];
  }

  // static async findById(id: number): Promise<Team> {
  //   const team = await Matches.findByPk(id);

  //   return team as Team;
  // }
}
