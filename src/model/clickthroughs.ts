import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface clickthroughsAttributes {
  id: number;
  refid?: string;
  created_date?: string;
  time: string;
  browser?: string;
  ipaddress?: string;
  refferalurl?: string;
  buy?: string;
}

export type clickthroughsPk = "id";
export type clickthroughsId = clickthroughs[clickthroughsPk];
export type clickthroughsOptionalAttributes = "id" | "refid" | "created_date" | "time" | "browser" | "ipaddress" | "refferalurl" | "buy";
export type clickthroughsCreationAttributes = Optional<clickthroughsAttributes, clickthroughsOptionalAttributes>;

export class clickthroughs extends Model<clickthroughsAttributes, clickthroughsCreationAttributes> implements clickthroughsAttributes {
  id!: number;
  refid?: string;
  created_date?: string;
  time!: string;
  browser?: string;
  ipaddress?: string;
  refferalurl?: string;
  buy?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof clickthroughs {
    return sequelize.define('clickthroughs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    refid: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "none"
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    browser: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "Could Not Find This Data"
    },
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "Could Not Find This Data"
    },
    refferalurl: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "none detected (maybe a direct link)"
    },
    buy: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "NO"
    }
  }, {
    tableName: 'clickthroughs',
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
  }) as typeof clickthroughs;
  }
}
