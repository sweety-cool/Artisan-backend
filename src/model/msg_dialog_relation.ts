import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface msg_dialog_relationAttributes {
  id: number;
  msg_id: number;
  msg_box: string;
  language: string;
  date_time: Date;
  from_id: number;
}

export type msg_dialog_relationPk = "id";
export type msg_dialog_relationId = msg_dialog_relation[msg_dialog_relationPk];
export type msg_dialog_relationOptionalAttributes = "id" | "date_time";
export type msg_dialog_relationCreationAttributes = Optional<msg_dialog_relationAttributes, msg_dialog_relationOptionalAttributes>;

export class msg_dialog_relation extends Model<msg_dialog_relationAttributes, msg_dialog_relationCreationAttributes> implements msg_dialog_relationAttributes {
  id!: number;
  msg_id!: number;
  msg_box!: string;
  language!: string;
  date_time!: Date;
  from_id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof msg_dialog_relation {
    return sequelize.define('msg_dialog_relation', {
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
    msg_box: {
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
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'msg_dialog_relation',
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
  }) as typeof msg_dialog_relation;
  }
}
