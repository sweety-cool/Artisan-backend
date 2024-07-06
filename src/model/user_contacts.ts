import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_contactsAttributes {
  id: number;
  user_id: number;
  msn: string;
  gtalk: string;
  yahoo: string;
  skype: string;
}

export type user_contactsPk = "id";
export type user_contactsId = user_contacts[user_contactsPk];
export type user_contactsOptionalAttributes = "id";
export type user_contactsCreationAttributes = Optional<user_contactsAttributes, user_contactsOptionalAttributes>;

export class user_contacts extends Model<user_contactsAttributes, user_contactsCreationAttributes> implements user_contactsAttributes {
  id!: number;
  user_id!: number;
  msn!: string;
  gtalk!: string;
  yahoo!: string;
  skype!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_contacts {
    return sequelize.define('user_contacts', {
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
    msn: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gtalk: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    yahoo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    skype: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'user_contacts',
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
  }) as typeof user_contacts;
  }
}
