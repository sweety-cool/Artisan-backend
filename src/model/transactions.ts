import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { invoices, invoicesId } from './invoices';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface transactionsAttributes {
  id: number;
  type: string;
  creator_id: number;
  buyer_id: number;
  provider_id: number;
  transaction_time: number;
  amount: number;
  amount_gbp: number;
  status?: string;
  description: string;
  paypal_address?: string;
  user_type?: string;
  reciever_id?: number;
  project_id?: number;
  package_id?: number;
  update_flag?: number;
  country_code?: number;
}

export type transactionsPk = "id";
export type transactionsId = transactions[transactionsPk];
export type transactionsOptionalAttributes = "id" | "creator_id" | "buyer_id" | "provider_id" | "status" | "paypal_address" | "user_type" | "reciever_id" | "project_id" | "package_id" | "update_flag" | "country_code";
export type transactionsCreationAttributes = Optional<transactionsAttributes, transactionsOptionalAttributes>;

export class transactions extends Model<transactionsAttributes, transactionsCreationAttributes> implements transactionsAttributes {
  id!: number;
  type!: string;
  creator_id!: number;
  buyer_id!: number;
  provider_id!: number;
  transaction_time!: number;
  amount!: number;
  amount_gbp!: number;
  status?: string;
  description!: string;
  paypal_address?: string;
  user_type?: string;
  reciever_id?: number;
  project_id?: number;
  package_id?: number;
  update_flag?: number;
  country_code?: number;

  // transactions belongsTo projects via project_id
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // transactions hasMany invoices via transaction_id
  invoices!: invoices[];
  getInvoices!: Sequelize.HasManyGetAssociationsMixin<invoices>;
  setInvoices!: Sequelize.HasManySetAssociationsMixin<invoices, invoicesId>;
  addInvoice!: Sequelize.HasManyAddAssociationMixin<invoices, invoicesId>;
  addInvoices!: Sequelize.HasManyAddAssociationsMixin<invoices, invoicesId>;
  createInvoice!: Sequelize.HasManyCreateAssociationMixin<invoices>;
  removeInvoice!: Sequelize.HasManyRemoveAssociationMixin<invoices, invoicesId>;
  removeInvoices!: Sequelize.HasManyRemoveAssociationsMixin<invoices, invoicesId>;
  hasInvoice!: Sequelize.HasManyHasAssociationMixin<invoices, invoicesId>;
  hasInvoices!: Sequelize.HasManyHasAssociationsMixin<invoices, invoicesId>;
  countInvoices!: Sequelize.HasManyCountAssociationsMixin;
  // transactions belongsTo users via creator_id
  creator!: users;
  getCreator!: Sequelize.BelongsToGetAssociationMixin<users>;
  setCreator!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createCreator!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // transactions belongsTo users via reciever_id
  reciever!: users;
  getReciever!: Sequelize.BelongsToGetAssociationMixin<users>;
  setReciever!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createReciever!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof transactions {
    return sequelize.define('transactions', {
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
    creator_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    buyer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    provider_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    transaction_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    amount_gbp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.CHAR(16),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    paypal_address: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    reciever_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    project_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    package_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    update_flag: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'transactions',
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
        name: "creator_id",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
      {
        name: "reciever_id",
        using: "BTREE",
        fields: [
          { name: "reciever_id" },
        ]
      },
    ]
  }) as typeof transactions;
  }
}
