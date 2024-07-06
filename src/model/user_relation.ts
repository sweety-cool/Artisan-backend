import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_relationAttributes {
  id: number;
  user_id: number;
  description: string;
  serv_description: string;
  language: string;
}

export type user_relationPk = "id";
export type user_relationId = user_relation[user_relationPk];
export type user_relationOptionalAttributes = "id";
export type user_relationCreationAttributes = Optional<user_relationAttributes, user_relationOptionalAttributes>;

export class user_relation extends Model<user_relationAttributes, user_relationCreationAttributes> implements user_relationAttributes {
  id!: number;
  user_id!: number;
  description!: string;
  serv_description!: string;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_relation {
    return sequelize.define('user_relation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    serv_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'user_relation',
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
  }) as typeof user_relation;
  }
}
