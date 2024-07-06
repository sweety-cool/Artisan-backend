import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface particular_job_manageAttributes {
  id: number;
  projectid: number;
  post_from: number;
  publish_fr: number;
  publish_uk: number;
  publish_it: number;
  row_no: number;
}

export type particular_job_managePk = "id";
export type particular_job_manageId = particular_job_manage[particular_job_managePk];
export type particular_job_manageOptionalAttributes = "id";
export type particular_job_manageCreationAttributes = Optional<particular_job_manageAttributes, particular_job_manageOptionalAttributes>;

export class particular_job_manage extends Model<particular_job_manageAttributes, particular_job_manageCreationAttributes> implements particular_job_manageAttributes {
  id!: number;
  projectid!: number;
  post_from!: number;
  publish_fr!: number;
  publish_uk!: number;
  publish_it!: number;
  row_no!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof particular_job_manage {
    return sequelize.define('particular_job_manage', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    post_from: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    publish_fr: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    publish_uk: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    publish_it: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    row_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'particular_job_manage',
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
  }) as typeof particular_job_manage;
  }
}
