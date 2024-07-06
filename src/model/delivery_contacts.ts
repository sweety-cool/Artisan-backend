import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface delivery_contactsAttributes {
  user_id: number;
  project_id: number;
  name: string;
  address: string;
  postalcode: string;
  city: string;
}

export type delivery_contactsPk = "project_id";
export type delivery_contactsId = delivery_contacts[delivery_contactsPk];
export type delivery_contactsCreationAttributes = delivery_contactsAttributes;

export class delivery_contacts extends Model<delivery_contactsAttributes, delivery_contactsCreationAttributes> implements delivery_contactsAttributes {
  user_id!: number;
  project_id!: number;
  name!: string;
  address!: string;
  postalcode!: string;
  city!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof delivery_contacts {
    return sequelize.define('delivery_contacts', {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    project_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    postalcode: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'delivery_contacts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof delivery_contacts;
  }
}
