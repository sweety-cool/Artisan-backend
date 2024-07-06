import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface page_itAttributes {
  id: number;
  url: string;
  name: string;
  page_title: string;
  content: string;
  is_active: number;
  created: number;
  country_code: number;
}

export type page_itPk = "id";
export type page_itId = page_it[page_itPk];
export type page_itOptionalAttributes = "id" | "is_active";
export type page_itCreationAttributes = Optional<page_itAttributes, page_itOptionalAttributes>;

export class page_it extends Model<page_itAttributes, page_itCreationAttributes> implements page_itAttributes {
  id!: number;
  url!: string;
  name!: string;
  page_title!: string;
  content!: string;
  is_active!: number;
  created!: number;
  country_code!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof page_it {
    return sequelize.define('page_it', {
    id: {
      autoIncrement: true,
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    page_title: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'page_it',
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
  }) as typeof page_it;
  }
}
