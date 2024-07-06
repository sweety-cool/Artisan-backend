import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface page_ukAttributes {
  id: number;
  url: string;
  name: string;
  page_title: string;
  content: string;
  is_active: number;
  created: number;
  country_code: number;
}

export type page_ukPk = "id";
export type page_ukId = page_uk[page_ukPk];
export type page_ukOptionalAttributes = "id" | "is_active";
export type page_ukCreationAttributes = Optional<page_ukAttributes, page_ukOptionalAttributes>;

export class page_uk extends Model<page_ukAttributes, page_ukCreationAttributes> implements page_ukAttributes {
  id!: number;
  url!: string;
  name!: string;
  page_title!: string;
  content!: string;
  is_active!: number;
  created!: number;
  country_code!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof page_uk {
    return sequelize.define('page_uk', {
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
    tableName: 'page_uk',
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
  }) as typeof page_uk;
  }
}
