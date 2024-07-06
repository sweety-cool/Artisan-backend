import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ipn_returnAttributes {
  invoice: number;
  receiver_email?: string;
  item_name?: string;
  item_number?: string;
  quantity?: string;
  payment_status?: string;
  pending_reason?: string;
  payment_date?: string;
  mc_gross?: string;
  mc_fee?: string;
  tax?: string;
  mc_currency?: string;
  txn_id?: string;
  txn_type?: string;
  first_name?: string;
  last_name?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  address_country?: string;
  address_status?: string;
  payer_email?: string;
  payer_status?: string;
  payment_type?: string;
  notify_version?: string;
  verify_sign?: string;
  referrer_id?: string;
}

export type ipn_returnPk = "invoice";
export type ipn_returnId = ipn_return[ipn_returnPk];
export type ipn_returnOptionalAttributes = "receiver_email" | "item_name" | "item_number" | "quantity" | "payment_status" | "pending_reason" | "payment_date" | "mc_gross" | "mc_fee" | "tax" | "mc_currency" | "txn_id" | "txn_type" | "first_name" | "last_name" | "address_street" | "address_city" | "address_state" | "address_zip" | "address_country" | "address_status" | "payer_email" | "payer_status" | "payment_type" | "notify_version" | "verify_sign" | "referrer_id";
export type ipn_returnCreationAttributes = Optional<ipn_returnAttributes, ipn_returnOptionalAttributes>;

export class ipn_return extends Model<ipn_returnAttributes, ipn_returnCreationAttributes> implements ipn_returnAttributes {
  invoice!: number;
  receiver_email?: string;
  item_name?: string;
  item_number?: string;
  quantity?: string;
  payment_status?: string;
  pending_reason?: string;
  payment_date?: string;
  mc_gross?: string;
  mc_fee?: string;
  tax?: string;
  mc_currency?: string;
  txn_id?: string;
  txn_type?: string;
  first_name?: string;
  last_name?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  address_country?: string;
  address_status?: string;
  payer_email?: string;
  payer_status?: string;
  payment_type?: string;
  notify_version?: string;
  verify_sign?: string;
  referrer_id?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof ipn_return {
    return sequelize.define('ipn_return', {
    invoice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    receiver_email: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    item_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    item_number: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    quantity: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    payment_status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    pending_reason: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    payment_date: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    mc_gross: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    mc_fee: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tax: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    mc_currency: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    txn_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    txn_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    address_street: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address_city: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    address_state: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    address_zip: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address_country: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    address_status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    payer_email: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    payer_status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    payment_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    notify_version: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    verify_sign: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    referrer_id: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'ipn_return',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invoice" },
        ]
      },
    ]
  }) as typeof ipn_return;
  }
}
