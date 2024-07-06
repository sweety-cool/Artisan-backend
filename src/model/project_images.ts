import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';

export interface project_imagesAttributes {
  id: number;
  project_id?: number;
  project_name: string;
  project_post_date: string;
  cust_id: number;
  sup_id: number;
  attach_file: string;
  upload_date: string;
  approved: number;
  country_code: number;
  adminApprove: number;
}

export type project_imagesPk = "id";
export type project_imagesId = project_images[project_imagesPk];
export type project_imagesOptionalAttributes = "id" | "project_id";
export type project_imagesCreationAttributes = Optional<project_imagesAttributes, project_imagesOptionalAttributes>;

export class project_images extends Model<project_imagesAttributes, project_imagesCreationAttributes> implements project_imagesAttributes {
  id!: number;
  project_id?: number;
  project_name!: string;
  project_post_date!: string;
  cust_id!: number;
  sup_id!: number;
  attach_file!: string;
  upload_date!: string;
  approved!: number;
  country_code!: number;
  adminApprove!: number;

  // project_images belongsTo projects via project_id
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_images {
    return sequelize.define('project_images', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
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
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    project_post_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cust_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sup_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attach_file: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    upload_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    approved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "1= Unapproved, 2=Approved"
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    adminApprove: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'project_images',
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
    ]
  }) as typeof project_images;
  }
}
