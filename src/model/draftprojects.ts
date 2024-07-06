import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface draftprojectsAttributes {
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
  creator_id: number;
  created: number;
  enddate: number;
  programmer_id: number;
  checkstamp: string;
  buyer_rated: '0' | '1';
  provider_rated: '0' | '1';
  project_paid: '0' | '1';
  is_private?: number;
  contact: string;
  salary: string;
  flag: number;
  salarytype: string;
  private_users?: string;
}

export type draftprojectsPk = "id";
export type draftprojectsId = draftprojects[draftprojectsPk];
export type draftprojectsOptionalAttributes = "id" | "budget_min" | "budget_max" | "is_feature" | "is_urgent" | "is_hide_bids" | "is_private" | "private_users";
export type draftprojectsCreationAttributes = Optional<draftprojectsAttributes, draftprojectsOptionalAttributes>;

export class draftprojects extends Model<draftprojectsAttributes, draftprojectsCreationAttributes> implements draftprojectsAttributes {
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
  creator_id!: number;
  created!: number;
  enddate!: number;
  programmer_id!: number;
  checkstamp!: string;
  buyer_rated!: '0' | '1';
  provider_rated!: '0' | '1';
  project_paid!: '0' | '1';
  is_private?: number;
  contact!: string;
  salary!: string;
  flag!: number;
  salarytype!: string;
  private_users?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof draftprojects {
    return sequelize.define('draftprojects', {
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
    programmer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    is_private: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contact: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    salary: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    flag: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    salarytype: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    private_users: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'draftprojects',
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
  }) as typeof draftprojects;
  }
}
