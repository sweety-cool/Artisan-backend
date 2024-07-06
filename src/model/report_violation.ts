import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface report_violationAttributes {
  id: number;
  project_id: string;
  project_name: string;
  post_id: string;
  post_name: string;
  comment: string;
  report_date: number;
  report_type: string;
}

export type report_violationPk = "id";
export type report_violationId = report_violation[report_violationPk];
export type report_violationOptionalAttributes = "id";
export type report_violationCreationAttributes = Optional<report_violationAttributes, report_violationOptionalAttributes>;

export class report_violation extends Model<report_violationAttributes, report_violationCreationAttributes> implements report_violationAttributes {
  id!: number;
  project_id!: string;
  project_name!: string;
  post_id!: string;
  post_name!: string;
  comment!: string;
  report_date!: number;
  report_type!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof report_violation {
    return sequelize.define('report_violation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    post_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    post_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    report_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    report_type: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    tableName: 'report_violation',
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
  }) as typeof report_violation;
  }
}
