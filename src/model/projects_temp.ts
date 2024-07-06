import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface projects_tempAttributes {
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
  images?: object;
  createdAt?: Date;
  updatedAt?: Date;
}

export type projects_tempPk = "id";
export type projects_tempId = projects_temp[projects_tempPk];
export type projects_tempOptionalAttributes = "id" | "project_status" | "buyer_complete_status" | "provider_complete_status" | "expedition_day" | "expedition_day2" | "track_number" | "additional_description" | "project_image" | "project_categories" | "project_start" | "start_bid" | "budget_min" | "budget_max" | "is_feature" | "is_urgent" | "is_hide_bids" | "creator_id" | "created" | "enddate" | "programmer_id" | "bid_select_date" | "unpaid_project_notify_date" | "checkstamp" | "buyer_rated" | "provider_rated" | "project_paid" | "project_award_date" | "project_award_date_format" | "project_fund_date_format" | "fund_release_date" | "notification_status" | "attachment_url" | "image" | "first_upload" | "attachment_name" | "attachment_folder" | "is_private" | "private_users" | "contact" | "salary" | "flag" | "salarytype" | "escrow_due" | "city" | "zipcode" | "post_for" | "project_post_format_date" | "project_post_date" | "project_expiry_date" | "expired_notification_sent" | "fund_notification_sent" | "unpaid_project_notif" | "site_fr" | "site_uk" | "site_it" | "country_code" | "pro_job" | "images" | "createdAt" | "updatedAt";
export type projects_tempCreationAttributes = Optional<projects_tempAttributes, projects_tempOptionalAttributes>;

export class projects_temp extends Model<projects_tempAttributes, projects_tempCreationAttributes> implements projects_tempAttributes {
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
  images?: object;
  createdAt?: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof projects_temp {
    return sequelize.define('projects_temp', {
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
      allowNull: true
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
      type: DataTypes.INTEGER,
      allowNull: true
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
      allowNull: true,
      defaultValue: 1
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
      allowNull: true,
      defaultValue: 0
    },
    site_uk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    site_it: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pro_job: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'projects_temp',
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
    ]
  }) as typeof projects_temp;
  }
}
