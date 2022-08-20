import Team from '../interfaces/team.interface';
import TeamModel from '../database/models/team.model';

export default class TeamService {
  static async list(): Promise<Team[]> {
    const teams = await TeamModel.findAll();

    return teams as Team[];
  }

  static async findById(id: number): Promise<Team> {
    const team = await TeamModel.findByPk(id);

    if (!team) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFoundError';
      throw e;
    }

    return team as Team;
  }
}
