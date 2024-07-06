import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface job_list_manageAttributes {
  id: number;
  site_name: string;
  jobs_fr: number;
  jobs_uk: number;
  jobs_it: number;
}

export type job_list_managePk = "id";
export type job_list_manageId = job_list_manage[job_list_managePk];
export type job_list_manageOptionalAttributes = "id";
export type job_list_manageCreationAttributes = Optional<job_list_manageAttributes, job_list_manageOptionalAttributes>;

export class job_list_manage extends Model<job_list_manageAttributes, job_list_manageCreationAttributes> implements job_list_manageAttributes {
  id!: number;
  site_name!: string;
  jobs_fr!: number;
  jobs_uk!: number;
  jobs_it!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof job_list_manage {
    return sequelize.define('job_list_manage', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    site_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    jobs_fr: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobs_uk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobs_it: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'job_list_manage',
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
  }) as typeof job_list_manage;
  }
}
