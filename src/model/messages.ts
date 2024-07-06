import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface messagesAttributes {
  id: number;
  project_id: number;
  reply_for?: number;
  from_id?: number;
  to_id?: number;
  buyer_message_status?: string;
  programmer_message_status?: string;
  provider_delete_status?: string;
  buyer_delete_status?: string;
  message: string;
  created: number;
  notification_status?: string;
  deluserid?: string;
  attach_file?: string;
  approve?: number;
  machine_parts_image?: string;
}

export type messagesPk = "id";
export type messagesId = messages[messagesPk];
export type messagesOptionalAttributes = "id" | "reply_for" | "from_id" | "to_id" | "buyer_message_status" | "programmer_message_status" | "provider_delete_status" | "buyer_delete_status" | "notification_status" | "deluserid" | "attach_file" | "approve" | "machine_parts_image";
export type messagesCreationAttributes = Optional<messagesAttributes, messagesOptionalAttributes>;

export class messages extends Model<messagesAttributes, messagesCreationAttributes> implements messagesAttributes {
  id!: number;
  project_id!: number;
  reply_for?: number;
  from_id?: number;
  to_id?: number;
  buyer_message_status?: string;
  programmer_message_status?: string;
  provider_delete_status?: string;
  buyer_delete_status?: string;
  message!: string;
  created!: number;
  notification_status?: string;
  deluserid?: string;
  attach_file?: string;
  approve?: number;
  machine_parts_image?: string;

  // messages belongsTo projects via project_id
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // messages belongsTo users via from_id
  from!: users;
  getFrom!: Sequelize.BelongsToGetAssociationMixin<users>;
  setFrom!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createFrom!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // messages belongsTo users via to_id
  to!: users;
  getTo!: Sequelize.BelongsToGetAssociationMixin<users>;
  setTo!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createTo!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof messages {
    return sequelize.define('messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    reply_for: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    from_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    to_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
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
      allowNull: false
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
    approve: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    machine_parts_image: {
      type: DataTypes.STRING(1500),
      allowNull: true
    }
  }, {
    tableName: 'messages',
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
        name: "to_id",
        using: "BTREE",
        fields: [
          { name: "to_id" },
        ]
      },
    ]
  }) as typeof messages;
  }
}
