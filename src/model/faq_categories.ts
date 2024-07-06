import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface faq_categoriesAttributes {
  id: number;
  category_name: string;
  created: number;
}

export type faq_categoriesPk = "id";
export type faq_categoriesId = faq_categories[faq_categoriesPk];
export type faq_categoriesOptionalAttributes = "id";
export type faq_categoriesCreationAttributes = Optional<faq_categoriesAttributes, faq_categoriesOptionalAttributes>;

export class faq_categories extends Model<faq_categoriesAttributes, faq_categoriesCreationAttributes> implements faq_categoriesAttributes {
  id!: number;
  category_name!: string;
  created!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof faq_categories {
    return sequelize.define('faq_categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'faq_categories',
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
  }) as typeof faq_categories;
  }
}
