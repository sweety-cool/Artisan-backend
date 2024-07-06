import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface packagesAttributes {
  id: number;
  package_name: string;
  description: string;
  start_date: number;
  end_date: number;
  isactive: number;
  total_days: number;
  created_date: number;
  updated_date: number;
  amount: number;
}

export type packagesPk = "id";
export type packagesId = packages[packagesPk];
export type packagesOptionalAttributes = "id";
export type packagesCreationAttributes = Optional<packagesAttributes, packagesOptionalAttributes>;

export class packages extends Model<packagesAttributes, packagesCreationAttributes> implements packagesAttributes {
  id!: number;
  package_name!: string;
  description!: string;
  start_date!: number;
  end_date!: number;
  isactive!: number;
  total_days!: number;
  created_date!: number;
  updated_date!: number;
  amount!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof packages {
    return sequelize.define('packages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    package_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isactive: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    total_days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'packages',
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
  }) as typeof packages;
  }
}
