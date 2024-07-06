import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface bansAttributes {
  id: number;
  ban_type: string;
  ban_value: string;
  ban_time: number;
}

export type bansPk = "id";
export type bansId = bans[bansPk];
export type bansOptionalAttributes = "id";
export type bansCreationAttributes = Optional<bansAttributes, bansOptionalAttributes>;

export class bans extends Model<bansAttributes, bansCreationAttributes> implements bansAttributes {
  id!: number;
  ban_type!: string;
  ban_value!: string;
  ban_time!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof bans {
    return sequelize.define('bans', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ban_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ban_value: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ban_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'bans',
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
  }) as typeof bans;
  }
}
