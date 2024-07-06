import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface steps_completed_by_supplierAttributes {
  id: number;
  project_id: number;
  step1: number;
  step2: number;
  step3: number;
}

export type steps_completed_by_supplierPk = "id";
export type steps_completed_by_supplierId = steps_completed_by_supplier[steps_completed_by_supplierPk];
export type steps_completed_by_supplierOptionalAttributes = "id";
export type steps_completed_by_supplierCreationAttributes = Optional<steps_completed_by_supplierAttributes, steps_completed_by_supplierOptionalAttributes>;

export class steps_completed_by_supplier extends Model<steps_completed_by_supplierAttributes, steps_completed_by_supplierCreationAttributes> implements steps_completed_by_supplierAttributes {
  id!: number;
  project_id!: number;
  step1!: number;
  step2!: number;
  step3!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof steps_completed_by_supplier {
    return sequelize.define('steps_completed_by_supplier', {
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
    step1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    step2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    step3: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'steps_completed_by_supplier',
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
  }) as typeof steps_completed_by_supplier;
  }
}
