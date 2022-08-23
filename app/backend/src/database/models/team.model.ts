import { Model, INTEGER, STRING } from 'sequelize';
import Match from '../../interfaces/match.interface';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
  homeMatches: Match[];
  awayMatches: Match[];
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'Teams',
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Teams;
