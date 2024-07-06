import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface adminsAttributes {
  id: number;
  admin_name: string;
  password: string;
}

export type adminsPk = "id";
export type adminsId = admins[adminsPk];
export type adminsOptionalAttributes = "id";
export type adminsCreationAttributes = Optional<adminsAttributes, adminsOptionalAttributes>;

export class admins extends Model<adminsAttributes, adminsCreationAttributes> implements adminsAttributes {
  id!: number;
  admin_name!: string;
  password!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof admins {
    return sequelize.define('admins', {
    id: {
      autoIncrement: true,
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    admin_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    tableName: 'admins',
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
  }) as typeof admins;
  }
}
