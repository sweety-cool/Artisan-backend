import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface affiliate_released_paymentsAttributes {
  id: number;
  user_id: number;
  refid: string;
  account_type: number;
  payment: string;
  created_date: number;
  created_date_forrmat: string;
}

export type affiliate_released_paymentsPk = "id";
export type affiliate_released_paymentsId = affiliate_released_payments[affiliate_released_paymentsPk];
export type affiliate_released_paymentsOptionalAttributes = "id";
export type affiliate_released_paymentsCreationAttributes = Optional<affiliate_released_paymentsAttributes, affiliate_released_paymentsOptionalAttributes>;

export class affiliate_released_payments extends Model<affiliate_released_paymentsAttributes, affiliate_released_paymentsCreationAttributes> implements affiliate_released_paymentsAttributes {
  id!: number;
  user_id!: number;
  refid!: string;
  account_type!: number;
  payment!: string;
  created_date!: number;
  created_date_forrmat!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof affiliate_released_payments {
    return sequelize.define('affiliate_released_payments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    refid: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    account_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payment: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    created_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_date_forrmat: {
      type: DataTypes.STRING(28),
      allowNull: false
    }
  }, {
    tableName: 'affiliate_released_payments',
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
  }) as typeof affiliate_released_payments;
  }
}
