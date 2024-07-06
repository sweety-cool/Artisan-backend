import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface rolesAttributes {
  id: number;
  role_name: string;
}

export type rolesPk = "id";
export type rolesId = roles[rolesPk];
export type rolesOptionalAttributes = "id";
export type rolesCreationAttributes = Optional<rolesAttributes, rolesOptionalAttributes>;

export class roles extends Model<rolesAttributes, rolesCreationAttributes> implements rolesAttributes {
  id!: number;
  role_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof roles {
    return sequelize.define('roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    tableName: 'roles',
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
  }) as typeof roles;
  }
}
