import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface project_relationAttributes {
  pid: number;
  project_id: number;
  project_name: string;
  description: string;
  language: string;
}

export type project_relationPk = "pid";
export type project_relationId = project_relation[project_relationPk];
export type project_relationOptionalAttributes = "pid";
export type project_relationCreationAttributes = Optional<project_relationAttributes, project_relationOptionalAttributes>;

export class project_relation extends Model<project_relationAttributes, project_relationCreationAttributes> implements project_relationAttributes {
  pid!: number;
  project_id!: number;
  project_name!: string;
  description!: string;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof project_relation {
    return sequelize.define('project_relation', {
    pid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'project_relation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pid" },
        ]
      },
    ]
  }) as typeof project_relation;
  }
}
