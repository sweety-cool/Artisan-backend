import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { bids, bidsId } from './bids';
import type { messages, messagesId } from './messages';
import type { notif_email_list, notif_email_listId } from './notif_email_list';
import type { prebid_messages, prebid_messagesId } from './prebid_messages';
import type { project_images, project_imagesId } from './project_images';
import type { reviews, reviewsId } from './reviews';
import type { transactions, transactionsId } from './transactions';
import type { users, usersId } from './users';

export interface projectsAttributes {
  id: number;
  project_name: string;
  project_status: string;
  buyer_complete_status?: number;
  provider_complete_status?: number;
  description: string;
  expedition_day?: string;
  expedition_day2?: string;
  track_number?: string;
  additional_description?: string;
  project_image?: string;
  project_categories?: string;
  project_start?: number;
  visibility: string;
  start_bid?: number;
  budget_min?: number;
  budget_max?: number;
  is_feature?: number;
  is_urgent?: number;
  is_hide_bids?: number;
  creator_id?: number;
  created?: number;
  enddate?: number;
  programmer_id?: number;
  bid_select_date?: Date;
  unpaid_project_notify_date?: Date;
  checkstamp?: string;
  buyer_rated?: '0' | '1';
  provider_rated?: '0' | '1';
  project_paid?: '0' | '1';
  project_award_date?: number;
  project_award_date_format?: Date;
  project_fund_date_format?: Date;
  fund_release_date?: Date;
  notification_status: number;
  attachment_url?: string;
  image?: string;
  first_upload?: number;
  attachment_name?: string;
  attachment_folder?: string;
  is_private: number;
  private_users?: string;
  contact?: string;
  salary?: string;
  flag?: number;
  salarytype?: string;
  escrow_due?: number;
  city?: string;
  zipcode?: string;
  post_for?: string;
  project_post_format_date?: Date;
  project_post_date?: string;
  project_expiry_date?: string;
  expired_notification_sent: string;
  fund_notification_sent: string;
  unpaid_project_notif?: string;
  site_fr?: number;
  site_uk?: number;
  site_it?: number;
  country_code?: number;
  pro_job?: number;
  posted_dt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  show_release?: number;
}

export type projectsPk = "id";
export type projectsId = projects[projectsPk];
export type projectsOptionalAttributes = "id" | "project_status" | "buyer_complete_status" | "provider_complete_status" | "expedition_day" | "expedition_day2" | "track_number" | "additional_description" | "project_image" | "project_categories" | "project_start" | "start_bid" | "budget_min" | "budget_max" | "is_feature" | "is_urgent" | "is_hide_bids" | "creator_id" | "created" | "enddate" | "programmer_id" | "bid_select_date" | "unpaid_project_notify_date" | "checkstamp" | "buyer_rated" | "provider_rated" | "project_paid" | "project_award_date" | "project_award_date_format" | "project_fund_date_format" | "fund_release_date" | "notification_status" | "attachment_url" | "image" | "first_upload" | "attachment_name" | "attachment_folder" | "is_private" | "private_users" | "contact" | "salary" | "flag" | "salarytype" | "escrow_due" | "city" | "zipcode" | "post_for" | "project_post_format_date" | "project_post_date" | "project_expiry_date" | "expired_notification_sent" | "fund_notification_sent" | "unpaid_project_notif" | "site_fr" | "site_uk" | "site_it" | "country_code" | "pro_job" | "posted_dt" | "createdAt" | "updatedAt" | "show_release";
export type projectsCreationAttributes = Optional<projectsAttributes, projectsOptionalAttributes>;

export class projects extends Model<projectsAttributes, projectsCreationAttributes> implements projectsAttributes {
  id!: number;
  project_name!: string;
  project_status!: string;
  buyer_complete_status?: number;
  provider_complete_status?: number;
  description!: string;
  expedition_day?: string;
  expedition_day2?: string;
  track_number?: string;
  additional_description?: string;
  project_image?: string;
  project_categories?: string;
  project_start?: number;
  visibility!: string;
  start_bid?: number;
  budget_min?: number;
  budget_max?: number;
  is_feature?: number;
  is_urgent?: number;
  is_hide_bids?: number;
  creator_id?: number;
  created?: number;
  enddate?: number;
  programmer_id?: number;
  bid_select_date?: Date;
  unpaid_project_notify_date?: Date;
  checkstamp?: string;
  buyer_rated?: '0' | '1';
  provider_rated?: '0' | '1';
  project_paid?: '0' | '1';
  project_award_date?: number;
  project_award_date_format?: Date;
  project_fund_date_format?: Date;
  fund_release_date?: Date;
  notification_status!: number;
  attachment_url?: string;
  image?: string;
  first_upload?: number;
  attachment_name?: string;
  attachment_folder?: string;
  is_private!: number;
  private_users?: string;
  contact?: string;
  salary?: string;
  flag?: number;
  salarytype?: string;
  escrow_due?: number;
  city?: string;
  zipcode?: string;
  post_for?: string;
  project_post_format_date?: Date;
  project_post_date?: string;
  project_expiry_date?: string;
  expired_notification_sent!: string;
  fund_notification_sent!: string;
  unpaid_project_notif?: string;
  site_fr?: number;
  site_uk?: number;
  site_it?: number;
  country_code?: number;
  pro_job?: number;
  posted_dt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  show_release?: number;

  // projects hasMany bids via project_id
  bids!: bids[];
  getBids!: Sequelize.HasManyGetAssociationsMixin<bids>;
  setBids!: Sequelize.HasManySetAssociationsMixin<bids, bidsId>;
  addBid!: Sequelize.HasManyAddAssociationMixin<bids, bidsId>;
  addBids!: Sequelize.HasManyAddAssociationsMixin<bids, bidsId>;
  createBid!: Sequelize.HasManyCreateAssociationMixin<bids>;
  removeBid!: Sequelize.HasManyRemoveAssociationMixin<bids, bidsId>;
  removeBids!: Sequelize.HasManyRemoveAssociationsMixin<bids, bidsId>;
  hasBid!: Sequelize.HasManyHasAssociationMixin<bids, bidsId>;
  hasBids!: Sequelize.HasManyHasAssociationsMixin<bids, bidsId>;
  countBids!: Sequelize.HasManyCountAssociationsMixin;
  // projects hasMany messages via project_id
  messages!: messages[];
  getMessages!: Sequelize.HasManyGetAssociationsMixin<messages>;
  setMessages!: Sequelize.HasManySetAssociationsMixin<messages, messagesId>;
  addMessage!: Sequelize.HasManyAddAssociationMixin<messages, messagesId>;
  addMessages!: Sequelize.HasManyAddAssociationsMixin<messages, messagesId>;
  createMessage!: Sequelize.HasManyCreateAssociationMixin<messages>;
  removeMessage!: Sequelize.HasManyRemoveAssociationMixin<messages, messagesId>;
  removeMessages!: Sequelize.HasManyRemoveAssociationsMixin<messages, messagesId>;
  hasMessage!: Sequelize.HasManyHasAssociationMixin<messages, messagesId>;
  hasMessages!: Sequelize.HasManyHasAssociationsMixin<messages, messagesId>;
  countMessages!: Sequelize.HasManyCountAssociationsMixin;
  // projects hasMany notif_email_list via project_id
  notif_email_lists!: notif_email_list[];
  getNotif_email_lists!: Sequelize.HasManyGetAssociationsMixin<notif_email_list>;
  setNotif_email_lists!: Sequelize.HasManySetAssociationsMixin<notif_email_list, notif_email_listId>;
  addNotif_email_list!: Sequelize.HasManyAddAssociationMixin<notif_email_list, notif_email_listId>;
  addNotif_email_lists!: Sequelize.HasManyAddAssociationsMixin<notif_email_list, notif_email_listId>;
  createNotif_email_list!: Sequelize.HasManyCreateAssociationMixin<notif_email_list>;
  removeNotif_email_list!: Sequelize.HasManyRemoveAssociationMixin<notif_email_list, notif_email_listId>;
  removeNotif_email_lists!: Sequelize.HasManyRemoveAssociationsMixin<notif_email_list, notif_email_listId>;
  hasNotif_email_list!: Sequelize.HasManyHasAssociationMixin<notif_email_list, notif_email_listId>;
  hasNotif_email_lists!: Sequelize.HasManyHasAssociationsMixin<notif_email_list, notif_email_listId>;
  countNotif_email_lists!: Sequelize.HasManyCountAssociationsMixin;
  // projects hasMany prebid_messages via project_id
  prebid_messages!: prebid_messages[];
  getPrebid_messages!: Sequelize.HasManyGetAssociationsMixin<prebid_messages>;
  setPrebid_messages!: Sequelize.HasManySetAssociationsMixin<prebid_messages, prebid_messagesId>;
  addPrebid_message!: Sequelize.HasManyAddAssociationMixin<prebid_messages, prebid_messagesId>;
  addPrebid_messages!: Sequelize.HasManyAddAssociationsMixin<prebid_messages, prebid_messagesId>;
  createPrebid_message!: Sequelize.HasManyCreateAssociationMixin<prebid_messages>;
  removePrebid_message!: Sequelize.HasManyRemoveAssociationMixin<prebid_messages, prebid_messagesId>;
  removePrebid_messages!: Sequelize.HasManyRemoveAssociationsMixin<prebid_messages, prebid_messagesId>;
  hasPrebid_message!: Sequelize.HasManyHasAssociationMixin<prebid_messages, prebid_messagesId>;
  hasPrebid_messages!: Sequelize.HasManyHasAssociationsMixin<prebid_messages, prebid_messagesId>;
  countPrebid_messages!: Sequelize.HasManyCountAssociationsMixin;
  // projects hasMany project_images via project_id
  project_images!: project_images[];
  getProject_images!: Sequelize.HasManyGetAssociationsMixin<project_images>;
  setProject_images!: Sequelize.HasManySetAssociationsMixin<project_images, project_imagesId>;
  addProject_image!: Sequelize.HasManyAddAssociationMixin<project_images, project_imagesId>;
  addProject_images!: Sequelize.HasManyAddAssociationsMixin<project_images, project_imagesId>;
  createProject_image!: Sequelize.HasManyCreateAssociationMixin<project_images>;
  removeProject_image!: Sequelize.HasManyRemoveAssociationMixin<project_images, project_imagesId>;
  removeProject_images!: Sequelize.HasManyRemoveAssociationsMixin<project_images, project_imagesId>;
  hasProject_image!: Sequelize.HasManyHasAssociationMixin<project_images, project_imagesId>;
  hasProject_images!: Sequelize.HasManyHasAssociationsMixin<project_images, project_imagesId>;
  countProject_images!: Sequelize.HasManyCountAssociationsMixin;
  // projects hasMany reviews via project_id
  reviews!: reviews[];
  getReviews!: Sequelize.HasManyGetAssociationsMixin<reviews>;
  setReviews!: Sequelize.HasManySetAssociationsMixin<reviews, reviewsId>;
  addReview!: Sequelize.HasManyAddAssociationMixin<reviews, reviewsId>;
  addReviews!: Sequelize.HasManyAddAssociationsMixin<reviews, reviewsId>;
  createReview!: Sequelize.HasManyCreateAssociationMixin<reviews>;
  removeReview!: Sequelize.HasManyRemoveAssociationMixin<reviews, reviewsId>;
  removeReviews!: Sequelize.HasManyRemoveAssociationsMixin<reviews, reviewsId>;
  hasReview!: Sequelize.HasManyHasAssociationMixin<reviews, reviewsId>;
  hasReviews!: Sequelize.HasManyHasAssociationsMixin<reviews, reviewsId>;
  countReviews!: Sequelize.HasManyCountAssociationsMixin;
  // projects hasMany transactions via project_id
  transactions!: transactions[];
  getTransactions!: Sequelize.HasManyGetAssociationsMixin<transactions>;
  setTransactions!: Sequelize.HasManySetAssociationsMixin<transactions, transactionsId>;
  addTransaction!: Sequelize.HasManyAddAssociationMixin<transactions, transactionsId>;
  addTransactions!: Sequelize.HasManyAddAssociationsMixin<transactions, transactionsId>;
  createTransaction!: Sequelize.HasManyCreateAssociationMixin<transactions>;
  removeTransaction!: Sequelize.HasManyRemoveAssociationMixin<transactions, transactionsId>;
  removeTransactions!: Sequelize.HasManyRemoveAssociationsMixin<transactions, transactionsId>;
  hasTransaction!: Sequelize.HasManyHasAssociationMixin<transactions, transactionsId>;
  hasTransactions!: Sequelize.HasManyHasAssociationsMixin<transactions, transactionsId>;
  countTransactions!: Sequelize.HasManyCountAssociationsMixin;
  // projects belongsTo users via creator_id
  creator!: users;
  getCreator!: Sequelize.BelongsToGetAssociationMixin<users>;
  setCreator!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createCreator!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // projects belongsTo users via programmer_id
  programmer!: users;
  getProgrammer!: Sequelize.BelongsToGetAssociationMixin<users>;
  setProgrammer!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createProgrammer!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof projects {
    return sequelize.define('projects', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    project_status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "0"
    },
    buyer_complete_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    provider_complete_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expedition_day: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expedition_day2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    track_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    additional_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    project_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_categories: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    project_start: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    visibility: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    start_bid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    budget_min: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    budget_max: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    is_feature: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_urgent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_hide_bids: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    creator_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    enddate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    programmer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    bid_select_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    unpaid_project_notify_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checkstamp: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    buyer_rated: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    provider_rated: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    project_paid: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    project_award_date: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    project_award_date_format: {
      type: DataTypes.DATE,
      allowNull: true
    },
    project_fund_date_format: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fund_release_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notification_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    attachment_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    first_upload: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attachment_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attachment_folder: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_private: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    private_users: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contact: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    salary: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    flag: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    salarytype: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    escrow_due: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    post_for: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    project_post_format_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    project_post_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    project_expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expired_notification_sent: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "N"
    },
    fund_notification_sent: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "N"
    },
    unpaid_project_notif: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    site_fr: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    site_uk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    site_it: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pro_job: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    posted_dt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    show_release: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    tableName: 'projects',
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
        name: "creator_id",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
      {
        name: "programmer_id",
        using: "BTREE",
        fields: [
          { name: "programmer_id" },
        ]
      },
    ]
  }) as typeof projects;
  }
}
