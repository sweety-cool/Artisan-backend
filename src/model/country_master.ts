import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface country_masterAttributes {
  id: number;
  country_name: string;
  site_name: string;
  language_code: string;
  website_url: string;
  time_zone: string;
  email_from: string;
}

export type country_masterPk = "id";
export type country_masterId = country_master[country_masterPk];
export type country_masterOptionalAttributes = "id";
export type country_masterCreationAttributes = Optional<country_masterAttributes, country_masterOptionalAttributes>;

export class country_master extends Model<country_masterAttributes, country_masterCreationAttributes> implements country_masterAttributes {
  id!: number;
  country_name!: string;
  site_name!: string;
  language_code!: string;
  website_url!: string;
  time_zone!: string;
  email_from!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof country_master {
    return sequelize.define('country_master', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    country_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    site_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    website_url: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    time_zone: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email_from: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'country_master',
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
  }) as typeof country_master;
  }
}
