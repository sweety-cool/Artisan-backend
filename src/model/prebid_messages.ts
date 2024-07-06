import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface prebid_messagesAttributes {
  id: number;
  project_id?: number;
  reply_for?: number;
  from_id: number;
  to_id: number;
  buyer_message_status?: string;
  programmer_message_status?: string;
  provider_delete_status?: string;
  buyer_delete_status?: string;
  message: string;
  created?: number;
  notification_status?: string;
  deluserid?: string;
  attach_file?: string;
  msg_type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type prebid_messagesPk = "id";
export type prebid_messagesId = prebid_messages[prebid_messagesPk];
export type prebid_messagesOptionalAttributes = "id" | "project_id" | "reply_for" | "buyer_message_status" | "programmer_message_status" | "provider_delete_status" | "buyer_delete_status" | "created" | "notification_status" | "deluserid" | "attach_file" | "createdAt" | "updatedAt";
export type prebid_messagesCreationAttributes = Optional<prebid_messagesAttributes, prebid_messagesOptionalAttributes>;

export class prebid_messages extends Model<prebid_messagesAttributes, prebid_messagesCreationAttributes> implements prebid_messagesAttributes {
  id!: number;
  project_id?: number;
  reply_for?: number;
  from_id!: number;
  to_id!: number;
  buyer_message_status?: string;
  programmer_message_status?: string;
  provider_delete_status?: string;
  buyer_delete_status?: string;
  message!: string;
  created?: number;
  notification_status?: string;
  deluserid?: string;
  attach_file?: string;
  msg_type!: string;
  createdAt?: Date;
  updatedAt?: Date;

  // prebid_messages belongsTo prebid_messages via reply_for
  reply_for_prebid_message!: prebid_messages;
  getReply_for_prebid_message!: Sequelize.BelongsToGetAssociationMixin<prebid_messages>;
  setReply_for_prebid_message!: Sequelize.BelongsToSetAssociationMixin<prebid_messages, prebid_messagesId>;
  createReply_for_prebid_message!: Sequelize.BelongsToCreateAssociationMixin<prebid_messages>;
  // prebid_messages belongsTo projects via project_id
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // prebid_messages belongsTo users via from_id
  from!: users;
  getFrom!: Sequelize.BelongsToGetAssociationMixin<users>;
  setFrom!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createFrom!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof prebid_messages {
    return sequelize.define('prebid_messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    reply_for: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'prebid_messages',
        key: 'id'
      }
    },
    from_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    to_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    buyer_message_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    programmer_message_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    provider_delete_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    buyer_delete_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notification_status: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "0",
      comment: "P=\"Prebid\",N=\"Notifications\""
    },
    deluserid: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attach_file: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    msg_type: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  }, {
    tableName: 'prebid_messages',
    timestamps: true,
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
        name: "project_id",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "from_id",
        using: "BTREE",
        fields: [
          { name: "from_id" },
        ]
      },
      {
        name: "reply_for",
        using: "BTREE",
        fields: [
          { name: "reply_for" },
        ]
      },
    ]
  }) as typeof prebid_messages;
  }
}
