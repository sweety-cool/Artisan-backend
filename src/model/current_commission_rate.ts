import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface current_commission_rateAttributes {
  id: number;
  rate: number;
  date: Date;
}

export type current_commission_ratePk = "id";
export type current_commission_rateId = current_commission_rate[current_commission_ratePk];
export type current_commission_rateOptionalAttributes = "id";
export type current_commission_rateCreationAttributes = Optional<current_commission_rateAttributes, current_commission_rateOptionalAttributes>;

export class current_commission_rate extends Model<current_commission_rateAttributes, current_commission_rateCreationAttributes> implements current_commission_rateAttributes {
  id!: number;
  rate!: number;
  date!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof current_commission_rate {
    return sequelize.define('current_commission_rate', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'current_commission_rate',
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
  }) as typeof current_commission_rate;
  }
}
