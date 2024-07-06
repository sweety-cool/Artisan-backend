import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface affiliate_welcome_msgAttributes {
  id: number;
  refid: string;
  referel: string;
  welcome_msg: string;
  msg_status: number;
}

export type affiliate_welcome_msgPk = "id";
export type affiliate_welcome_msgId = affiliate_welcome_msg[affiliate_welcome_msgPk];
export type affiliate_welcome_msgOptionalAttributes = "id";
export type affiliate_welcome_msgCreationAttributes = Optional<affiliate_welcome_msgAttributes, affiliate_welcome_msgOptionalAttributes>;

export class affiliate_welcome_msg extends Model<affiliate_welcome_msgAttributes, affiliate_welcome_msgCreationAttributes> implements affiliate_welcome_msgAttributes {
  id!: number;
  refid!: string;
  referel!: string;
  welcome_msg!: string;
  msg_status!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof affiliate_welcome_msg {
    return sequelize.define('affiliate_welcome_msg', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    refid: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    referel: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    welcome_msg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    msg_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'affiliate_welcome_msg',
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
  }) as typeof affiliate_welcome_msg;
  }
}
