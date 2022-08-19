import { Model, INTEGER, BOOLEAN } from 'sequelize';
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
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'Matches',
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

// Matches.belongsTo(Team, { as: 'teamHome', foreignKey: 'homeTeam' });
// Matches.belongsTo(Team, { as: 'teamAway', foreignKey: 'awatTeam' });

Team.hasMany(Matches, { foreignKey: 'homeTeam' });
Team.hasMany(Matches, { foreignKey: 'awayTeam' });

Matches.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });
// Matches.hasMany(Team, { foreignKey: 'awayTeam' });

// Team.belongsTo(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
// Team.belongsTo(Matches, { foreignKey: 'teamName', as: 'teamAway' });
// Team.hasMany(Matches, { as: 'teamHome', foreignKey: 'teamName' });
// Team.hasMany(Matches, { as: 'teamAway', foreignKey: 'teamName' });

export default Matches;
