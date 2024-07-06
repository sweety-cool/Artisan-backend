import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface supplier_stepsAttributes {
  project_id: number;
  step_1: number;
  step_2: number;
  step_3: number;
}

export type supplier_stepsCreationAttributes = supplier_stepsAttributes;

export class supplier_steps extends Model<supplier_stepsAttributes, supplier_stepsCreationAttributes> implements supplier_stepsAttributes {
  project_id!: number;
  step_1!: number;
  step_2!: number;
  step_3!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof supplier_steps {
    return sequelize.define('supplier_steps', {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    step_1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    step_2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    step_3: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'supplier_steps',
    timestamps: false
  }) as typeof supplier_steps;
  }
}
