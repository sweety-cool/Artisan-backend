import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface commission_rateAttributes {
  commission_id: number;
  rate: number;
  date: Date;
}

export type commission_ratePk = "commission_id";
export type commission_rateId = commission_rate[commission_ratePk];
export type commission_rateOptionalAttributes = "commission_id";
export type commission_rateCreationAttributes = Optional<commission_rateAttributes, commission_rateOptionalAttributes>;

export class commission_rate extends Model<commission_rateAttributes, commission_rateCreationAttributes> implements commission_rateAttributes {
  commission_id!: number;
  rate!: number;
  date!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof commission_rate {
    return sequelize.define('commission_rate', {
    commission_id: {
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
    tableName: 'commission_rate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "commission_id" },
        ]
      },
    ]
  }) as typeof commission_rate;
  }
}
