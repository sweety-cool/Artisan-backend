import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface rating_holdAttributes {
  id: number;
  user_id: number;
  rating: number;
  project_id: number;
}

export type rating_holdPk = "id";
export type rating_holdId = rating_hold[rating_holdPk];
export type rating_holdOptionalAttributes = "id";
export type rating_holdCreationAttributes = Optional<rating_holdAttributes, rating_holdOptionalAttributes>;

export class rating_hold extends Model<rating_holdAttributes, rating_holdCreationAttributes> implements rating_holdAttributes {
  id!: number;
  user_id!: number;
  rating!: number;
  project_id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof rating_hold {
    return sequelize.define('rating_hold', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'rating_hold',
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
  }) as typeof rating_hold;
  }
}
