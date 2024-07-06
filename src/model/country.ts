import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface countryAttributes {
  id: number;
  country_symbol: string;
  country_name: string;
}

export type countryPk = "id";
export type countryId = country[countryPk];
export type countryOptionalAttributes = "id";
export type countryCreationAttributes = Optional<countryAttributes, countryOptionalAttributes>;

export class country extends Model<countryAttributes, countryCreationAttributes> implements countryAttributes {
  id!: number;
  country_symbol!: string;
  country_name!: string;

  // country hasMany users via country_code
  users!: users[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<users>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<users, usersId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<users, usersId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<users, usersId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<users>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<users, usersId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<users, usersId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<users, usersId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<users, usersId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof country {
    return sequelize.define('country', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    country_symbol: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    country_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'country',
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
  }) as typeof country;
  }
}
