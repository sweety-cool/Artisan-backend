import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface supplier_job_pageAttributes {
  id: number;
  steps_name: string;
  steps_desc: string;
  button_text: string;
  language: string;
}

export type supplier_job_pagePk = "id";
export type supplier_job_pageId = supplier_job_page[supplier_job_pagePk];
export type supplier_job_pageOptionalAttributes = "id";
export type supplier_job_pageCreationAttributes = Optional<supplier_job_pageAttributes, supplier_job_pageOptionalAttributes>;

export class supplier_job_page extends Model<supplier_job_pageAttributes, supplier_job_pageCreationAttributes> implements supplier_job_pageAttributes {
  id!: number;
  steps_name!: string;
  steps_desc!: string;
  button_text!: string;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof supplier_job_page {
    return sequelize.define('supplier_job_page', {
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
    tableName: 'supplier_job_page',
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
  }) as typeof supplier_job_page;
  }
}
