import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface bookmarkAttributes {
  id: number;
  creator_id: string;
  creator_name: string;
  project_id: string;
  project_name: string;
  project_creator: string;
}

export type bookmarkPk = "id";
export type bookmarkId = bookmark[bookmarkPk];
export type bookmarkOptionalAttributes = "id";
export type bookmarkCreationAttributes = Optional<bookmarkAttributes, bookmarkOptionalAttributes>;

export class bookmark extends Model<bookmarkAttributes, bookmarkCreationAttributes> implements bookmarkAttributes {
  id!: number;
  creator_id!: string;
  creator_name!: string;
  project_id!: string;
  project_name!: string;
  project_creator!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof bookmark {
    return sequelize.define('bookmark', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    creator_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    project_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    project_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    project_creator: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    tableName: 'bookmark',
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
  }) as typeof bookmark;
  }
}
