import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface project_topicsAttributes {
  projectid: number;
  topics: string;
}

export type project_topicsCreationAttributes = project_topicsAttributes;

export class project_topics extends Model<project_topicsAttributes, project_topicsCreationAttributes> implements project_topicsAttributes {
  projectid!: number;
  topics!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof project_topics {
    return sequelize.define('project_topics', {
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    topics: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'project_topics',
    timestamps: false
  }) as typeof project_topics;
  }
}
