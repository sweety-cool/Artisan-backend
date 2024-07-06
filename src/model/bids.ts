import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface bidsAttributes {
  id: number;
  project_id?: number;
  user_id?: number;
  bid_days?: number;
  bid_hours?: number;
  bid_file?: string;
  bid_amount?: number;
  bid_amount_gbp?: number;
  bid_time?: number;
  bid_desc?: string;
  lowbid_notify?: '0' | '1';
  escrow_flag?: number;
  no_offer?: number;
}

export type bidsPk = "id";
export type bidsId = bids[bidsPk];
export type bidsOptionalAttributes = "id" | "project_id" | "user_id" | "bid_days" | "bid_hours" | "bid_file" | "bid_amount" | "bid_amount_gbp" | "bid_time" | "bid_desc" | "lowbid_notify" | "escrow_flag" | "no_offer";
export type bidsCreationAttributes = Optional<bidsAttributes, bidsOptionalAttributes>;

export class bids extends Model<bidsAttributes, bidsCreationAttributes> implements bidsAttributes {
  id!: number;
  project_id?: number;
  user_id?: number;
  bid_days?: number;
  bid_hours?: number;
  bid_file?: string;
  bid_amount?: number;
  bid_amount_gbp?: number;
  bid_time?: number;
  bid_desc?: string;
  lowbid_notify?: '0' | '1';
  escrow_flag?: number;
  no_offer?: number;

  // bids belongsTo projects via project_id
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // bids belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof bids {
    return sequelize.define('bids', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    bid_days: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bid_hours: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bid_file: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bid_amount: {
      type: DataTypes.MEDIUMINT,
      allowNull: true
    },
    bid_amount_gbp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bid_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bid_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lowbid_notify: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    escrow_flag: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    no_offer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1=offer, 2=Blank offer"
    }
  }, {
    tableName: 'bids',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof bids;
  }
}
