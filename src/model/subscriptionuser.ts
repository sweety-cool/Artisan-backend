import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface subscriptionuserAttributes {
  id: number;
  username: number;
  package_id: number;
  valid: number;
  amount: string;
  created: string;
  flag: number;
  updated_date: number;
}

export type subscriptionuserPk = "id";
export type subscriptionuserId = subscriptionuser[subscriptionuserPk];
export type subscriptionuserOptionalAttributes = "id";
export type subscriptionuserCreationAttributes = Optional<subscriptionuserAttributes, subscriptionuserOptionalAttributes>;

export class subscriptionuser extends Model<subscriptionuserAttributes, subscriptionuserCreationAttributes> implements subscriptionuserAttributes {
  id!: number;
  username!: number;
  package_id!: number;
  valid!: number;
  amount!: string;
  created!: string;
  flag!: number;
  updated_date!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof subscriptionuser {
    return sequelize.define('subscriptionuser', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    package_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    valid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    created: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    flag: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    updated_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'subscriptionuser',
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
  }) as typeof subscriptionuser;
  }
}
