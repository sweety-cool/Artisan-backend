import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface prebid_message_relationAttributes {
  id: number;
  msg_id: number;
  message: string;
  language: string;
  date_time: Date;
}

export type prebid_message_relationPk = "id";
export type prebid_message_relationId = prebid_message_relation[prebid_message_relationPk];
export type prebid_message_relationOptionalAttributes = "id" | "date_time";
export type prebid_message_relationCreationAttributes = Optional<prebid_message_relationAttributes, prebid_message_relationOptionalAttributes>;

export class prebid_message_relation extends Model<prebid_message_relationAttributes, prebid_message_relationCreationAttributes> implements prebid_message_relationAttributes {
  id!: number;
  msg_id!: number;
  message!: string;
  language!: string;
  date_time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof prebid_message_relation {
    return sequelize.define('prebid_message_relation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    msg_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'prebid_message_relation',
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
  }) as typeof prebid_message_relation;
  }
}
