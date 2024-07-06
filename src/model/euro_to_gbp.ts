import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface euro_to_gbpAttributes {
  rate_ratio: number;
  date: string;
}

export type euro_to_gbpCreationAttributes = euro_to_gbpAttributes;

export class euro_to_gbp extends Model<euro_to_gbpAttributes, euro_to_gbpCreationAttributes> implements euro_to_gbpAttributes {
  rate_ratio!: number;
  date!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof euro_to_gbp {
    return sequelize.define('euro_to_gbp', {
    rate_ratio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'euro_to_gbp',
    timestamps: false
  }) as typeof euro_to_gbp;
  }
}
