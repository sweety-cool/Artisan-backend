import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface contactsAttributes {
  id: number;
  email_id: string;
  subject: string;
  comments: string;
  created: number;
}

export type contactsPk = "id";
export type contactsId = contacts[contactsPk];
export type contactsOptionalAttributes = "id";
export type contactsCreationAttributes = Optional<contactsAttributes, contactsOptionalAttributes>;

export class contacts extends Model<contactsAttributes, contactsCreationAttributes> implements contactsAttributes {
  id!: number;
  email_id!: string;
  subject!: string;
  comments!: string;
  created!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof contacts {
    return sequelize.define('contacts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'contacts',
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
  }) as typeof contacts;
  }
}
