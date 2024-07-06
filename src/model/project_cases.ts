import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface project_casesAttributes {
  id: number;
  project_id: number;
  user_id: number;
  admin_id: number;
  case_type: string;
  case_reason: string;
  problem_description: string;
  private_comments: string;
  review_type: string;
  payment: number;
  created: number;
  parent: number;
  updates: string;
  status: 'open' | 'closed';
}

export type project_casesPk = "id";
export type project_casesId = project_cases[project_casesPk];
export type project_casesOptionalAttributes = "id";
export type project_casesCreationAttributes = Optional<project_casesAttributes, project_casesOptionalAttributes>;

export class project_cases extends Model<project_casesAttributes, project_casesCreationAttributes> implements project_casesAttributes {
  id!: number;
  project_id!: number;
  user_id!: number;
  admin_id!: number;
  case_type!: string;
  case_reason!: string;
  problem_description!: string;
  private_comments!: string;
  review_type!: string;
  payment!: number;
  created!: number;
  parent!: number;
  updates!: string;
  status!: 'open' | 'closed';


  static initModel(sequelize: Sequelize.Sequelize): typeof project_cases {
    return sequelize.define('project_cases', {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    case_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    case_reason: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    problem_description: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    private_comments: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    review_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    payment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updates: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('open','closed'),
      allowNull: false
    }
  }, {
    tableName: 'project_cases',
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
  }) as typeof project_cases;
  }
}
