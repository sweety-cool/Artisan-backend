import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface country_master_newAttributes {
  id: number;
  country_name: string;
  site_name: string;
  language_code: string;
  website_url: string;
  time_zone: string;
}

export type country_master_newPk = "id";
export type country_master_newId = country_master_new[country_master_newPk];
export type country_master_newOptionalAttributes = "id";
export type country_master_newCreationAttributes = Optional<country_master_newAttributes, country_master_newOptionalAttributes>;

export class country_master_new extends Model<country_master_newAttributes, country_master_newCreationAttributes> implements country_master_newAttributes {
  id!: number;
  country_name!: string;
  site_name!: string;
  language_code!: string;
  website_url!: string;
  time_zone!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof country_master_new {
    return sequelize.define('country_master_new', {
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
    }
  }, {
    tableName: 'country_master_new',
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
  }) as typeof country_master_new;
  }
}
