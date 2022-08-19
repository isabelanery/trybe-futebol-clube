import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  id!: number;
  teamName!: string;
}

TeamModel.init({
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
  modelName: 'TeamModel',
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default TeamModel;
