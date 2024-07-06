import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface email_templatesAttributes {
  id: number;
  type: string;
  title: string;
  mail_subject: string;
  mail_body: string;
  email_num: number;
  country_code: string;
}

export type email_templatesPk = "id";
export type email_templatesId = email_templates[email_templatesPk];
export type email_templatesOptionalAttributes = "id";
export type email_templatesCreationAttributes = Optional<email_templatesAttributes, email_templatesOptionalAttributes>;

export class email_templates extends Model<email_templatesAttributes, email_templatesCreationAttributes> implements email_templatesAttributes {
  id!: number;
  type!: string;
  title!: string;
  mail_subject!: string;
  mail_body!: string;
  email_num!: number;
  country_code!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof email_templates {
    return sequelize.define('email_templates', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mail_subject: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mail_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email_num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country_code: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  }, {
    tableName: 'email_templates',
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
  }) as typeof email_templates;
  }
}
