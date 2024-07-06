import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface gbp_rate_historyAttributes {
  id: number;
  rate_ratio: number;
  date: string;
}

export type gbp_rate_historyPk = "id";
export type gbp_rate_historyId = gbp_rate_history[gbp_rate_historyPk];
export type gbp_rate_historyOptionalAttributes = "id";
export type gbp_rate_historyCreationAttributes = Optional<gbp_rate_historyAttributes, gbp_rate_historyOptionalAttributes>;

export class gbp_rate_history extends Model<gbp_rate_historyAttributes, gbp_rate_historyCreationAttributes> implements gbp_rate_historyAttributes {
  id!: number;
  rate_ratio!: number;
  date!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof gbp_rate_history {
    return sequelize.define('gbp_rate_history', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rate_ratio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'gbp_rate_history',
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
  }) as typeof gbp_rate_history;
  }
}
