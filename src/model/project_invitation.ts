import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface project_invitationAttributes {
  id: number;
  project_id: string;
  sender_id: string;
  receiver_id: string;
  invite_date: number;
  notification_status: number;
}

export type project_invitationPk = "id";
export type project_invitationId = project_invitation[project_invitationPk];
export type project_invitationOptionalAttributes = "id" | "notification_status";
export type project_invitationCreationAttributes = Optional<project_invitationAttributes, project_invitationOptionalAttributes>;

export class project_invitation extends Model<project_invitationAttributes, project_invitationCreationAttributes> implements project_invitationAttributes {
  id!: number;
  project_id!: string;
  sender_id!: string;
  receiver_id!: string;
  invite_date!: number;
  notification_status!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof project_invitation {
    return sequelize.define('project_invitation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    sender_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    receiver_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    invite_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notification_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'project_invitation',
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
  }) as typeof project_invitation;
  }
}
