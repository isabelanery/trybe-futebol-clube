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
  modelName: 'userModel',
  tableName: 'users',
  underscored: true,
});

export default UserModel;
