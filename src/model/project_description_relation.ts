import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface project_description_relationAttributes {
  id: number;
  desc_id: number;
  project_desc: string;
  language: string;
  date_time: Date;
}

export type project_description_relationPk = "id";
export type project_description_relationId = project_description_relation[project_description_relationPk];
export type project_description_relationOptionalAttributes = "id" | "date_time";
export type project_description_relationCreationAttributes = Optional<project_description_relationAttributes, project_description_relationOptionalAttributes>;

export class project_description_relation extends Model<project_description_relationAttributes, project_description_relationCreationAttributes> implements project_description_relationAttributes {
  id!: number;
  desc_id!: number;
  project_desc!: string;
  language!: string;
  date_time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof project_description_relation {
    return sequelize.define('project_description_relation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    desc_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'project_description_relation',
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
  }) as typeof project_description_relation;
  }
}
