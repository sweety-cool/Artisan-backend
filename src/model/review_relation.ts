import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface review_relationAttributes {
  id: number;
  review_id: number;
  comments: string;
  language: string;
}

export type review_relationPk = "id";
export type review_relationId = review_relation[review_relationPk];
export type review_relationOptionalAttributes = "id";
export type review_relationCreationAttributes = Optional<review_relationAttributes, review_relationOptionalAttributes>;

export class review_relation extends Model<review_relationAttributes, review_relationCreationAttributes> implements review_relationAttributes {
  id!: number;
  review_id!: number;
  comments!: string;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof review_relation {
    return sequelize.define('review_relation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'review_relation',
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
  }) as typeof review_relation;
  }
}
