import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface reviewsAttributes {
  id: number;
  comments?: string;
  rating?: number;
  provider_rate1?: number;
  provider_rate2?: number;
  provider_rate3?: number;
  provider_rate4?: number;
  provider_rate5?: number;
  provider_rate6?: number;
  provider_rating_avg?: number;
  emp_rate1?: number;
  emp_rate2?: number;
  emp_rate3?: number;
  emp_rate4?: number;
  emp_rate5?: number;
  emp_rate6?: number;
  emp_rating_avg?: number;
  review_time?: number;
  review_post_date?: Date;
  review_type?: '1' | '2';
  project_id: number;
  buyer_id: number;
  provider_id: number;
  hold?: '0' | '1';
  buyer_status?: string;
  provider_status?: string;
  country_code?: number;
}

export type reviewsPk = "id";
export type reviewsId = reviews[reviewsPk];
export type reviewsOptionalAttributes = "id" | "comments" | "rating" | "provider_rate1" | "provider_rate2" | "provider_rate3" | "provider_rate4" | "provider_rate5" | "provider_rate6" | "provider_rating_avg" | "emp_rate1" | "emp_rate2" | "emp_rate3" | "emp_rate4" | "emp_rate5" | "emp_rate6" | "emp_rating_avg" | "review_time" | "review_post_date" | "review_type" | "hold" | "buyer_status" | "provider_status" | "country_code";
export type reviewsCreationAttributes = Optional<reviewsAttributes, reviewsOptionalAttributes>;

export class reviews extends Model<reviewsAttributes, reviewsCreationAttributes> implements reviewsAttributes {
  id!: number;
  comments?: string;
  rating?: number;
  provider_rate1?: number;
  provider_rate2?: number;
  provider_rate3?: number;
  provider_rate4?: number;
  provider_rate5?: number;
  provider_rate6?: number;
  provider_rating_avg?: number;
  emp_rate1?: number;
  emp_rate2?: number;
  emp_rate3?: number;
  emp_rate4?: number;
  emp_rate5?: number;
  emp_rate6?: number;
  emp_rating_avg?: number;
  review_time?: number;
  review_post_date?: Date;
  review_type?: '1' | '2';
  project_id!: number;
  buyer_id!: number;
  provider_id!: number;
  hold?: '0' | '1';
  buyer_status?: string;
  provider_status?: string;
  country_code?: number;

  // reviews belongsTo projects via project_id
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // reviews belongsTo users via buyer_id
  buyer!: users;
  getBuyer!: Sequelize.BelongsToGetAssociationMixin<users>;
  setBuyer!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createBuyer!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // reviews belongsTo users via provider_id
  provider!: users;
  getProvider!: Sequelize.BelongsToGetAssociationMixin<users>;
  setProvider!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createProvider!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof reviews {
    return sequelize.define('reviews', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    provider_rate1: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    provider_rate2: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    provider_rate3: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    provider_rate4: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    provider_rate5: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    provider_rate6: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    provider_rating_avg: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    emp_rate1: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    emp_rate2: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    emp_rate3: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    emp_rate4: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    emp_rate5: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    emp_rate6: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    emp_rating_avg: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    review_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    review_post_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    review_type: {
      type: DataTypes.ENUM('1','2'),
      allowNull: true
    },
    project_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    buyer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    provider_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    hold: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    buyer_status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    provider_status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'reviews',
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
        name: "buyer_id",
        using: "BTREE",
        fields: [
          { name: "buyer_id" },
        ]
      },
      {
        name: "provider_id",
        using: "BTREE",
        fields: [
          { name: "provider_id" },
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
  }) as typeof reviews;
  }
}
