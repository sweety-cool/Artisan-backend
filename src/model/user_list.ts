import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_listAttributes {
  id: number;
  creator_id: string;
  user_id: string;
  user_name: string;
  user_role: string;
}

export type user_listPk = "id";
export type user_listId = user_list[user_listPk];
export type user_listOptionalAttributes = "id";
export type user_listCreationAttributes = Optional<user_listAttributes, user_listOptionalAttributes>;

export class user_list extends Model<user_listAttributes, user_listCreationAttributes> implements user_listAttributes {
  id!: number;
  creator_id!: string;
  user_id!: string;
  user_name!: string;
  user_role!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_list {
    return sequelize.define('user_list', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    user_role: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    tableName: 'user_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof user_list;
  }
}
