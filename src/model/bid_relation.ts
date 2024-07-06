import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface bid_relationAttributes {
  id: number;
  bid_id: number;
  bid_desc: string;
  language: string;
  date_time: Date;
}

export type bid_relationPk = "id";
export type bid_relationId = bid_relation[bid_relationPk];
export type bid_relationOptionalAttributes = "id" | "date_time";
export type bid_relationCreationAttributes = Optional<bid_relationAttributes, bid_relationOptionalAttributes>;

export class bid_relation extends Model<bid_relationAttributes, bid_relationCreationAttributes> implements bid_relationAttributes {
  id!: number;
  bid_id!: number;
  bid_desc!: string;
  language!: string;
  date_time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof bid_relation {
    return sequelize.define('bid_relation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bid_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bid_desc: {
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
    tableName: 'bid_relation',
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
  }) as typeof bid_relation;
  }
}
