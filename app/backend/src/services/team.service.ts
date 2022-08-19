import Team from '../interfaces/team.interface';
import TeamModel from '../database/models/team.model';

export default class TeamService {
  static async list(): Promise<Team[]> {
    const teams = await TeamModel.findAll();

    return teams as Team[];
  }

  static async findById(id: number): Promise<Team> {
    const team = await TeamModel.findByPk(id);

    return team as Team;
  }
}
