import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface popular_searchAttributes {
  id: number;
  keyword: string;
  type: 'work' | 'user';
  created: number;
}

export type popular_searchPk = "id";
export type popular_searchId = popular_search[popular_searchPk];
export type popular_searchOptionalAttributes = "id";
export type popular_searchCreationAttributes = Optional<popular_searchAttributes, popular_searchOptionalAttributes>;

export class popular_search extends Model<popular_searchAttributes, popular_searchCreationAttributes> implements popular_searchAttributes {
  id!: number;
  keyword!: string;
  type!: 'work' | 'user';
  created!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof popular_search {
    return sequelize.define('popular_search', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    keyword: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('work','user'),
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'popular_search',
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
  }) as typeof popular_search;
  }
}
