import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
}

UserModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'UserModel',
  tableName: 'users',
  underscored: true,
  timestamps: false,
});

export default UserModel;
