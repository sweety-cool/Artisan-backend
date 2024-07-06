import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_categoriesAttributes {
  id: number;
  user_id: number;
  user_categories: string;
}

export type user_categoriesPk = "id";
export type user_categoriesId = user_categories[user_categoriesPk];
export type user_categoriesOptionalAttributes = "id";
export type user_categoriesCreationAttributes = Optional<user_categoriesAttributes, user_categoriesOptionalAttributes>;

export class user_categories extends Model<user_categoriesAttributes, user_categoriesCreationAttributes> implements user_categoriesAttributes {
  id!: number;
  user_id!: number;
  user_categories!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_categories {
    return sequelize.define('user_categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_categories: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'user_categories',
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
  }) as typeof user_categories;
  }
}
