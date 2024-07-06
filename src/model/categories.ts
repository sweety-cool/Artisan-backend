import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface categoriesAttributes {
  id: number;
  category_name: string;
  group_id: number;
  description: string;
  page_title: string;
  meta_keywords: string;
  meta_description: string;
  is_active: number;
  created: number;
  modified: number;
}

export type categoriesPk = "id";
export type categoriesId = categories[categoriesPk];
export type categoriesOptionalAttributes = "id" | "is_active";
export type categoriesCreationAttributes = Optional<categoriesAttributes, categoriesOptionalAttributes>;

export class categories extends Model<categoriesAttributes, categoriesCreationAttributes> implements categoriesAttributes {
  id!: number;
  category_name!: string;
  group_id!: number;
  description!: string;
  page_title!: string;
  meta_keywords!: string;
  meta_description!: string;
  is_active!: number;
  created!: number;
  modified!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof categories {
    return sequelize.define('categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    group_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    page_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    meta_keywords: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    meta_description: {
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
    modified: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'categories',
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
  }) as typeof categories;
  }
}
