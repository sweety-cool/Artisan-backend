import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface paymentsAttributes {
  id: number;
  title: string;
  deposit_description: string;
  withdraw_description: string;
  is_deposit_enabled: number;
  is_withdraw_enabled: number;
  deposit_minimum: number;
  withdraw_minimum: number;
  mail_id: string;
  url: string;
  commission: number;
  is_enable: number;
  url_status: number;
  language: string;
}

export type paymentsPk = "id";
export type paymentsId = payments[paymentsPk];
export type paymentsOptionalAttributes = "id" | "is_deposit_enabled" | "is_withdraw_enabled";
export type paymentsCreationAttributes = Optional<paymentsAttributes, paymentsOptionalAttributes>;

export class payments extends Model<paymentsAttributes, paymentsCreationAttributes> implements paymentsAttributes {
  id!: number;
  title!: string;
  deposit_description!: string;
  withdraw_description!: string;
  is_deposit_enabled!: number;
  is_withdraw_enabled!: number;
  deposit_minimum!: number;
  withdraw_minimum!: number;
  mail_id!: string;
  url!: string;
  commission!: number;
  is_enable!: number;
  url_status!: number;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof payments {
    return sequelize.define('payments', {
    id: {
      autoIncrement: true,
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    deposit_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    withdraw_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_deposit_enabled: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    is_withdraw_enabled: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    deposit_minimum: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    withdraw_minimum: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    mail_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    commission: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    url_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'payments',
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
  }) as typeof payments;
  }
}
