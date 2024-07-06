import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface customer_job_pageAttributes {
  id: number;
  steps_name: string;
  steps_desc: string;
  button_text: string;
  language: string;
}

export type customer_job_pagePk = "id";
export type customer_job_pageId = customer_job_page[customer_job_pagePk];
export type customer_job_pageOptionalAttributes = "id";
export type customer_job_pageCreationAttributes = Optional<customer_job_pageAttributes, customer_job_pageOptionalAttributes>;

export class customer_job_page extends Model<customer_job_pageAttributes, customer_job_pageCreationAttributes> implements customer_job_pageAttributes {
  id!: number;
  steps_name!: string;
  steps_desc!: string;
  button_text!: string;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof customer_job_page {
    return sequelize.define('customer_job_page', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    steps_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    steps_desc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    button_text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'customer_job_page',
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
  }) as typeof customer_job_page;
  }
}
