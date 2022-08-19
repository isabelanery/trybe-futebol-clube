import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

UserModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: INTEGER,
  },
}, {
  sequelize: db,
  modelName: 'MatchModel',
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

export default UserModel;
