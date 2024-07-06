import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface notif_email_listAttributes {
  id: number;
  customer_id: number;
  supplier_id: number;
  project_id: number;
  email_type: string;
  email_subject: string;
  email_body: string;
  notif_date: Date;
  message_status: string;
}

export type notif_email_listPk = "id";
export type notif_email_listId = notif_email_list[notif_email_listPk];
export type notif_email_listOptionalAttributes = "id";
export type notif_email_listCreationAttributes = Optional<notif_email_listAttributes, notif_email_listOptionalAttributes>;

export class notif_email_list extends Model<notif_email_listAttributes, notif_email_listCreationAttributes> implements notif_email_listAttributes {
  id!: number;
  customer_id!: number;
  supplier_id!: number;
  project_id!: number;
  email_type!: string;
  email_subject!: string;
  email_body!: string;
  notif_date!: Date;
  message_status!: string;

  // notif_email_list belongsTo projects via project_id
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // notif_email_list belongsTo users via customer_id
  customer!: users;
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<users>;
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof notif_email_list {
    return sequelize.define('notif_email_list', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    email_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email_subject: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notif_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    message_status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  }, {
    tableName: 'notif_email_list',
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
      {
        name: "customer_id",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "project_id",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  }) as typeof notif_email_list;
  }
}
