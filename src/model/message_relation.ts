import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface message_relationAttributes {
  id: number;
  msg_id: number;
  message: string;
  language: string;
  date_time: Date;
}

export type message_relationPk = "id";
export type message_relationId = message_relation[message_relationPk];
export type message_relationOptionalAttributes = "id" | "date_time";
export type message_relationCreationAttributes = Optional<message_relationAttributes, message_relationOptionalAttributes>;

export class message_relation extends Model<message_relationAttributes, message_relationCreationAttributes> implements message_relationAttributes {
  id!: number;
  msg_id!: number;
  message!: string;
  language!: string;
  date_time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof message_relation {
    return sequelize.define('message_relation', {
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
    tableName: 'message_relation',
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
  }) as typeof message_relation;
  }
}
