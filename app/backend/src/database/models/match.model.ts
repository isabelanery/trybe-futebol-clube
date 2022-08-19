import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './team.model';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Matches.init({
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
  modelName: 'Matches',
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

Team.hasMany(Matches, { foreignKey: 'id', as: 'homeTeam' });
Matches.belongsTo(Team, { foreignKey: 'id', as: 'homeTeam' });

Team.hasMany(Matches, { foreignKey: 'id', as: 'awayTeam' });
Matches.belongsTo(Team, { foreignKey: 'id', as: 'awayTeam' });

export default Matches;
