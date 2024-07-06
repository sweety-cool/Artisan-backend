import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_balanceAttributes {
  id: number;
  user_id: number;
  amount: number;
  amount_gbp: number;
}

export type user_balancePk = "id";
export type user_balanceId = user_balance[user_balancePk];
export type user_balanceOptionalAttributes = "id" | "amount";
export type user_balanceCreationAttributes = Optional<user_balanceAttributes, user_balanceOptionalAttributes>;

export class user_balance extends Model<user_balanceAttributes, user_balanceCreationAttributes> implements user_balanceAttributes {
  id!: number;
  user_id!: number;
  amount!: number;
  amount_gbp!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_balance {
    return sequelize.define('user_balance', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    amount_gbp: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'user_balance',
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
  }) as typeof user_balance;
  }
}
