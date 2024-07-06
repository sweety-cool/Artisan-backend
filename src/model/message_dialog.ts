import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface message_dialogAttributes {
  id: number;
  project_id: number;
  send_from: number;
  send_to: number;
  msg_box: string;
  datetime: Date;
  attachment?: string;
  approve?: number;
}

export type message_dialogPk = "id";
export type message_dialogId = message_dialog[message_dialogPk];
export type message_dialogOptionalAttributes = "id" | "datetime" | "attachment" | "approve";
export type message_dialogCreationAttributes = Optional<message_dialogAttributes, message_dialogOptionalAttributes>;

export class message_dialog extends Model<message_dialogAttributes, message_dialogCreationAttributes> implements message_dialogAttributes {
  id!: number;
  project_id!: number;
  send_from!: number;
  send_to!: number;
  msg_box!: string;
  datetime!: Date;
  attachment?: string;
  approve?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof message_dialog {
    return sequelize.define('message_dialog', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    send_from: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    send_to: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    msg_box: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    attachment: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    approve: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'message_dialog',
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
  }) as typeof message_dialog;
  }
}
