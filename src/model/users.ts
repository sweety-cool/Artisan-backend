import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { bids, bidsId } from './bids';
import type { country, countryId } from './country';
import type { messages, messagesId } from './messages';
import type { notif_email_list, notif_email_listId } from './notif_email_list';
import type { prebid_messages, prebid_messagesId } from './prebid_messages';
import type { projects, projectsId } from './projects';
import type { reviews, reviewsId } from './reviews';
import type { transactions, transactionsId } from './transactions';

export interface usersAttributes {
  id: number;
  refid: string;
  country_code: number;
  user_name?: string;
  name: string;
  surname: string;
  address1?: string;
  address2?: string;
  description?: string;
  company_name?: string;
  company_number?: string;
  role_id: number;
  password?: string;
  email: string;
  paypal_email?: string;
  profile_desc?: string;
  service_desc?: string;
  voter?: string;
  prof_pic?: string;
  prot_pic?: string;
  pdf_file?: string;
  account?: string;
  user_status: number;
  activation_key?: string;
  zcode?: string;
  Squestion?: string;
  answer?: string;
  state?: string;
  city?: string;
  country_symbol?: string;
  project_notify?: string;
  bid_notify?: string;
  message_notify?: string;
  rate?: number;
  logo?: string;
  created?: number;
  last_activity?: number;
  user_rating?: number;
  num_reviews?: number;
  rating_hold?: number;
  tot_rating?: number;
  suspend_status: '0' | '1';
  ban_status: '0' | '1';
  admin_status?: string;
  admin_status_uk?: string;
  admin_status_it?: string;
  job_fr?: number;
  job_uk?: number;
  job_it?: number;
  choice?: number;
  supLogin?: string;
  lang?: string;
  pro_user: number;
  pro_vat?: number;
  siren?: string;
  mailchimp_id?: string;
  nxtduedate?: string;
  entrepreneur?: number;
  bid_status: number;
  last_seen?: Date;
  show_modal?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "refid" | "user_name" | "address1" | "address2" | "description" | "company_name" | "company_number" | "password" | "paypal_email" | "profile_desc" | "service_desc" | "voter" | "prof_pic" | "prot_pic" | "pdf_file" | "account" | "user_status" | "activation_key" | "zcode" | "Squestion" | "answer" | "state" | "city" | "country_symbol" | "project_notify" | "bid_notify" | "message_notify" | "rate" | "logo" | "created" | "last_activity" | "user_rating" | "num_reviews" | "rating_hold" | "tot_rating" | "suspend_status" | "ban_status" | "admin_status" | "admin_status_uk" | "admin_status_it" | "job_fr" | "job_uk" | "job_it" | "choice" | "supLogin" | "lang" | "pro_user" | "pro_vat" | "siren" | "mailchimp_id" | "nxtduedate" | "entrepreneur" | "bid_status" | "last_seen" | "show_modal" | "createdAt" | "updatedAt";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  refid!: string;
  country_code!: number;
  user_name?: string;
  name!: string;
  surname!: string;
  address1?: string;
  address2?: string;
  description?: string;
  company_name?: string;
  company_number?: string;
  role_id!: number;
  password?: string;
  email!: string;
  paypal_email?: string;
  profile_desc?: string;
  service_desc?: string;
  voter?: string;
  prof_pic?: string;
  prot_pic?: string;
  pdf_file?: string;
  account?: string;
  user_status!: number;
  activation_key?: string;
  zcode?: string;
  Squestion?: string;
  answer?: string;
  state?: string;
  city?: string;
  country_symbol?: string;
  project_notify?: string;
  bid_notify?: string;
  message_notify?: string;
  rate?: number;
  logo?: string;
  created?: number;
  last_activity?: number;
  user_rating?: number;
  num_reviews?: number;
  rating_hold?: number;
  tot_rating?: number;
  suspend_status!: '0' | '1';
  ban_status!: '0' | '1';
  admin_status?: string;
  admin_status_uk?: string;
  admin_status_it?: string;
  job_fr?: number;
  job_uk?: number;
  job_it?: number;
  choice?: number;
  supLogin?: string;
  lang?: string;
  pro_user!: number;
  pro_vat?: number;
  siren?: string;
  mailchimp_id?: string;
  nxtduedate?: string;
  entrepreneur?: number;
  bid_status!: number;
  last_seen?: Date;
  show_modal?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // users belongsTo country via country_code
  country_code_country!: country;
  getCountry_code_country!: Sequelize.BelongsToGetAssociationMixin<country>;
  setCountry_code_country!: Sequelize.BelongsToSetAssociationMixin<country, countryId>;
  createCountry_code_country!: Sequelize.BelongsToCreateAssociationMixin<country>;
  // users hasMany bids via user_id
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
  // users hasMany messages via from_id
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
  // users hasMany messages via to_id
  to_messages!: messages[];
  getTo_messages!: Sequelize.HasManyGetAssociationsMixin<messages>;
  setTo_messages!: Sequelize.HasManySetAssociationsMixin<messages, messagesId>;
  addTo_message!: Sequelize.HasManyAddAssociationMixin<messages, messagesId>;
  addTo_messages!: Sequelize.HasManyAddAssociationsMixin<messages, messagesId>;
  createTo_message!: Sequelize.HasManyCreateAssociationMixin<messages>;
  removeTo_message!: Sequelize.HasManyRemoveAssociationMixin<messages, messagesId>;
  removeTo_messages!: Sequelize.HasManyRemoveAssociationsMixin<messages, messagesId>;
  hasTo_message!: Sequelize.HasManyHasAssociationMixin<messages, messagesId>;
  hasTo_messages!: Sequelize.HasManyHasAssociationsMixin<messages, messagesId>;
  countTo_messages!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany notif_email_list via customer_id
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
  // users hasMany prebid_messages via from_id
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
  // users hasMany projects via creator_id
  projects!: projects[];
  getProjects!: Sequelize.HasManyGetAssociationsMixin<projects>;
  setProjects!: Sequelize.HasManySetAssociationsMixin<projects, projectsId>;
  addProject!: Sequelize.HasManyAddAssociationMixin<projects, projectsId>;
  addProjects!: Sequelize.HasManyAddAssociationsMixin<projects, projectsId>;
  createProject!: Sequelize.HasManyCreateAssociationMixin<projects>;
  removeProject!: Sequelize.HasManyRemoveAssociationMixin<projects, projectsId>;
  removeProjects!: Sequelize.HasManyRemoveAssociationsMixin<projects, projectsId>;
  hasProject!: Sequelize.HasManyHasAssociationMixin<projects, projectsId>;
  hasProjects!: Sequelize.HasManyHasAssociationsMixin<projects, projectsId>;
  countProjects!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany projects via programmer_id
  programmer_projects!: projects[];
  getProgrammer_projects!: Sequelize.HasManyGetAssociationsMixin<projects>;
  setProgrammer_projects!: Sequelize.HasManySetAssociationsMixin<projects, projectsId>;
  addProgrammer_project!: Sequelize.HasManyAddAssociationMixin<projects, projectsId>;
  addProgrammer_projects!: Sequelize.HasManyAddAssociationsMixin<projects, projectsId>;
  createProgrammer_project!: Sequelize.HasManyCreateAssociationMixin<projects>;
  removeProgrammer_project!: Sequelize.HasManyRemoveAssociationMixin<projects, projectsId>;
  removeProgrammer_projects!: Sequelize.HasManyRemoveAssociationsMixin<projects, projectsId>;
  hasProgrammer_project!: Sequelize.HasManyHasAssociationMixin<projects, projectsId>;
  hasProgrammer_projects!: Sequelize.HasManyHasAssociationsMixin<projects, projectsId>;
  countProgrammer_projects!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany reviews via buyer_id
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
  // users hasMany reviews via provider_id
  provider_reviews!: reviews[];
  getProvider_reviews!: Sequelize.HasManyGetAssociationsMixin<reviews>;
  setProvider_reviews!: Sequelize.HasManySetAssociationsMixin<reviews, reviewsId>;
  addProvider_review!: Sequelize.HasManyAddAssociationMixin<reviews, reviewsId>;
  addProvider_reviews!: Sequelize.HasManyAddAssociationsMixin<reviews, reviewsId>;
  createProvider_review!: Sequelize.HasManyCreateAssociationMixin<reviews>;
  removeProvider_review!: Sequelize.HasManyRemoveAssociationMixin<reviews, reviewsId>;
  removeProvider_reviews!: Sequelize.HasManyRemoveAssociationsMixin<reviews, reviewsId>;
  hasProvider_review!: Sequelize.HasManyHasAssociationMixin<reviews, reviewsId>;
  hasProvider_reviews!: Sequelize.HasManyHasAssociationsMixin<reviews, reviewsId>;
  countProvider_reviews!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany transactions via creator_id
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
  // users hasMany transactions via reciever_id
  reciever_transactions!: transactions[];
  getReciever_transactions!: Sequelize.HasManyGetAssociationsMixin<transactions>;
  setReciever_transactions!: Sequelize.HasManySetAssociationsMixin<transactions, transactionsId>;
  addReciever_transaction!: Sequelize.HasManyAddAssociationMixin<transactions, transactionsId>;
  addReciever_transactions!: Sequelize.HasManyAddAssociationsMixin<transactions, transactionsId>;
  createReciever_transaction!: Sequelize.HasManyCreateAssociationMixin<transactions>;
  removeReciever_transaction!: Sequelize.HasManyRemoveAssociationMixin<transactions, transactionsId>;
  removeReciever_transactions!: Sequelize.HasManyRemoveAssociationsMixin<transactions, transactionsId>;
  hasReciever_transaction!: Sequelize.HasManyHasAssociationMixin<transactions, transactionsId>;
  hasReciever_transactions!: Sequelize.HasManyHasAssociationsMixin<transactions, transactionsId>;
  countReciever_transactions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    refid: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "0"
    },
    country_code: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      }
    },
    user_name: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    company_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    paypal_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profile_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    service_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    voter: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prof_pic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prot_pic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pdf_file: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    account: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    activation_key: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    zcode: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    Squestion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    answer: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    country_symbol: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    project_notify: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    bid_notify: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    message_notify: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    rate: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    last_activity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_rating: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    num_reviews: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rating_hold: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tot_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    suspend_status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    },
    ban_status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    },
    admin_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    admin_status_uk: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    admin_status_it: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    job_fr: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    job_uk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    job_it: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    choice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    supLogin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    pro_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pro_vat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    siren: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mailchimp_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nxtduedate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    entrepreneur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "0=>Not Entrepreneur and 1 => Entrepreneur"
    },
    bid_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "0=>Not able to bid and 1 => able to bid"
    },
    last_seen: {
      type: DataTypes.DATE,
      allowNull: true
    },
    show_modal: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    tableName: 'users',
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
        name: "country_code",
        using: "BTREE",
        fields: [
          { name: "country_code" },
        ]
      },
    ]
  }) as typeof users;
  }
}
