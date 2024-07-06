import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface affiliate_unreleased_paymentsAttributes {
  id: number;
  user_id: number;
  refid: string;
  account_type: number;
  payment: string;
  created_date: number;
  created_date_format: string;
  is_released: string;
}

export type affiliate_unreleased_paymentsPk = "id";
export type affiliate_unreleased_paymentsId = affiliate_unreleased_payments[affiliate_unreleased_paymentsPk];
export type affiliate_unreleased_paymentsOptionalAttributes = "id";
export type affiliate_unreleased_paymentsCreationAttributes = Optional<affiliate_unreleased_paymentsAttributes, affiliate_unreleased_paymentsOptionalAttributes>;

export class affiliate_unreleased_payments extends Model<affiliate_unreleased_paymentsAttributes, affiliate_unreleased_paymentsCreationAttributes> implements affiliate_unreleased_paymentsAttributes {
  id!: number;
  user_id!: number;
  refid!: string;
  account_type!: number;
  payment!: string;
  created_date!: number;
  created_date_format!: string;
  is_released!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof affiliate_unreleased_payments {
    return sequelize.define('affiliate_unreleased_payments', {
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
    created_date_format: {
      type: DataTypes.STRING(28),
      allowNull: false
    },
    is_released: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  }, {
    tableName: 'affiliate_unreleased_payments',
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
  }) as typeof affiliate_unreleased_payments;
  }
}
