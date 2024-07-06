import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface sessionsAttributes {
  session_id: string;
  ip_address: string;
  user_agent: string;
  last_activity: number;
  user_data: string;
  post_data: string;
}

export type sessionsPk = "session_id";
export type sessionsId = sessions[sessionsPk];
export type sessionsOptionalAttributes = "session_id" | "ip_address" | "last_activity";
export type sessionsCreationAttributes = Optional<sessionsAttributes, sessionsOptionalAttributes>;

export class sessions extends Model<sessionsAttributes, sessionsCreationAttributes> implements sessionsAttributes {
  session_id!: string;
  ip_address!: string;
  user_agent!: string;
  last_activity!: number;
  user_data!: string;
  post_data!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof sessions {
    return sequelize.define('sessions', {
    session_id: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: "0",
      primaryKey: true
    },
    ip_address: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: "0"
    },
    user_agent: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_activity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    user_data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_data: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'sessions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "session_id" },
        ]
      },
    ]
  }) as typeof sessions;
  }
}
