import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface pageAttributes {
  id: number;
  url: string;
  name: string;
  page_title: string;
  content: string;
  is_active: number;
  created: number;
  country_code: number;
}

export type pagePk = "id";
export type pageId = page[pagePk];
export type pageOptionalAttributes = "id" | "is_active";
export type pageCreationAttributes = Optional<pageAttributes, pageOptionalAttributes>;

export class page extends Model<pageAttributes, pageCreationAttributes> implements pageAttributes {
  id!: number;
  url!: string;
  name!: string;
  page_title!: string;
  content!: string;
  is_active!: number;
  created!: number;
  country_code!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof page {
    return sequelize.define('page', {
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
    tableName: 'page',
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
  }) as typeof page;
  }
}
