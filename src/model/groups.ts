import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface groupsAttributes {
  id: number;
  group_name: string;
  descritpion?: string;
  created?: number;
  modified?: number;
}

export type groupsPk = "id";
export type groupsId = groups[groupsPk];
export type groupsOptionalAttributes = "id" | "descritpion" | "created" | "modified";
export type groupsCreationAttributes = Optional<groupsAttributes, groupsOptionalAttributes>;

export class groups extends Model<groupsAttributes, groupsCreationAttributes> implements groupsAttributes {
  id!: number;
  group_name!: string;
  descritpion?: string;
  created?: number;
  modified?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof groups {
    return sequelize.define('groups', {
    id: {
      autoIncrement: true,
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    group_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descritpion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    modified: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'groups',
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
  }) as typeof groups;
  }
}
