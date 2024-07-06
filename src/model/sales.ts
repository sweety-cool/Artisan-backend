import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface salesAttributes {
  id: number;
  refid: string;
  referral: string;
  account_type: number;
  created_date?: string;
  signup_date: number;
  signup_date_format: string;
  created_time: string;
  browser: string;
  ipaddress: string;
  payment: string;
}

export type salesPk = "id";
export type salesId = sales[salesPk];
export type salesOptionalAttributes = "id" | "refid" | "created_date" | "created_time" | "browser" | "ipaddress" | "payment";
export type salesCreationAttributes = Optional<salesAttributes, salesOptionalAttributes>;

export class sales extends Model<salesAttributes, salesCreationAttributes> implements salesAttributes {
  id!: number;
  refid!: string;
  referral!: string;
  account_type!: number;
  created_date?: string;
  signup_date!: number;
  signup_date_format!: string;
  created_time!: string;
  browser!: string;
  ipaddress!: string;
  payment!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof sales {
    return sequelize.define('sales', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    refid: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    referral: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    account_type: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    signup_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    signup_date_format: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created_time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    browser: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    ipaddress: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    payment: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    tableName: 'sales',
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
  }) as typeof sales;
  }
}
