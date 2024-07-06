import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface project_descriptionsAttributes {
  id: number;
  project_id: number;
  description: string;
  post_date_time: Date;
}

export type project_descriptionsPk = "id";
export type project_descriptionsId = project_descriptions[project_descriptionsPk];
export type project_descriptionsOptionalAttributes = "id";
export type project_descriptionsCreationAttributes = Optional<project_descriptionsAttributes, project_descriptionsOptionalAttributes>;

export class project_descriptions extends Model<project_descriptionsAttributes, project_descriptionsCreationAttributes> implements project_descriptionsAttributes {
  id!: number;
  project_id!: number;
  description!: string;
  post_date_time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof project_descriptions {
    return sequelize.define('project_descriptions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'project_descriptions',
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
  }) as typeof project_descriptions;
  }
}
