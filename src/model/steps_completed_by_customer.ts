import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface steps_completed_by_customerAttributes {
  id: number;
  project_id: number;
  step1: number;
  step2: number;
  step3: number;
}

export type steps_completed_by_customerPk = "id";
export type steps_completed_by_customerId = steps_completed_by_customer[steps_completed_by_customerPk];
export type steps_completed_by_customerOptionalAttributes = "id";
export type steps_completed_by_customerCreationAttributes = Optional<steps_completed_by_customerAttributes, steps_completed_by_customerOptionalAttributes>;

export class steps_completed_by_customer extends Model<steps_completed_by_customerAttributes, steps_completed_by_customerCreationAttributes> implements steps_completed_by_customerAttributes {
  id!: number;
  project_id!: number;
  step1!: number;
  step2!: number;
  step3!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof steps_completed_by_customer {
    return sequelize.define('steps_completed_by_customer', {
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
    tableName: 'steps_completed_by_customer',
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
  }) as typeof steps_completed_by_customer;
  }
}
