import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface filesAttributes {
  id: number;
  user_id: number;
  location: string;
  created: number;
  delete: number;
  key: string;
  description: string;
  file_size: number;
  file_type: string;
  original_name: string;
}

export type filesPk = "id";
export type filesId = files[filesPk];
export type filesOptionalAttributes = "id";
export type filesCreationAttributes = Optional<filesAttributes, filesOptionalAttributes>;

export class files extends Model<filesAttributes, filesCreationAttributes> implements filesAttributes {
  id!: number;
  user_id!: number;
  location!: string;
  created!: number;
  delete!: number;
  key!: string;
  description!: string;
  file_size!: number;
  file_type!: string;
  original_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof files {
    return sequelize.define('files', {
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
    location: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    delete: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    file_type: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    original_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    tableName: 'files',
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
  }) as typeof files;
  }
}
