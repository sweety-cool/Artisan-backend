import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface projects_previewAttributes {
  id: number;
  project_name: string;
  project_status: '0' | '1' | '2' | '3';
  description: string;
  project_categories: string;
  budget_min?: number;
  budget_max?: number;
  is_feature?: number;
  is_urgent?: number;
  is_hide_bids?: number;
  is_private?: number;
  creator_id: number;
  created: number;
  enddate: number;
  open_days: number;
  programmer_id: number;
  project_award_date?: number;
  checkstamp: string;
  buyer_rated: '0' | '1';
  provider_rated: '0' | '1';
  project_paid: '0' | '1';
  CONTACT: string;
  SALARY: string;
  FLAG: number;
  SALARYTYPE: string;
}

export type projects_previewPk = "id";
export type projects_previewId = projects_preview[projects_previewPk];
export type projects_previewOptionalAttributes = "id" | "budget_min" | "budget_max" | "is_feature" | "is_urgent" | "is_hide_bids" | "is_private" | "project_award_date";
export type projects_previewCreationAttributes = Optional<projects_previewAttributes, projects_previewOptionalAttributes>;

export class projects_preview extends Model<projects_previewAttributes, projects_previewCreationAttributes> implements projects_previewAttributes {
  id!: number;
  project_name!: string;
  project_status!: '0' | '1' | '2' | '3';
  description!: string;
  project_categories!: string;
  budget_min?: number;
  budget_max?: number;
  is_feature?: number;
  is_urgent?: number;
  is_hide_bids?: number;
  is_private?: number;
  creator_id!: number;
  created!: number;
  enddate!: number;
  open_days!: number;
  programmer_id!: number;
  project_award_date?: number;
  checkstamp!: string;
  buyer_rated!: '0' | '1';
  provider_rated!: '0' | '1';
  project_paid!: '0' | '1';
  CONTACT!: string;
  SALARY!: string;
  FLAG!: number;
  SALARYTYPE!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof projects_preview {
    return sequelize.define('projects_preview', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    project_status: {
      type: DataTypes.ENUM('0','1','2','3'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    project_categories: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    budget_min: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    budget_max: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    is_feature: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_urgent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_hide_bids: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_private: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    creator_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    enddate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    open_days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programmer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_award_date: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    checkstamp: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    buyer_rated: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    provider_rated: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    project_paid: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    CONTACT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    SALARY: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    FLAG: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SALARYTYPE: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'projects_preview',
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
  }) as typeof projects_preview;
  }
}
