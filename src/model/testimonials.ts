import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface testimonialsAttributes {
  id: number;
  creator_id: string;
  testimonial: string;
  testimonial_subject: string;
  posted_date: number;
  status: string;
  show_at: string;
  language: string;
}

export type testimonialsPk = "id";
export type testimonialsId = testimonials[testimonialsPk];
export type testimonialsCreationAttributes = testimonialsAttributes;

export class testimonials extends Model<testimonialsAttributes, testimonialsCreationAttributes> implements testimonialsAttributes {
  id!: number;
  creator_id!: string;
  testimonial!: string;
  testimonial_subject!: string;
  posted_date!: number;
  status!: string;
  show_at!: string;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof testimonials {
    return sequelize.define('testimonials', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    testimonial: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    testimonial_subject: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    posted_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "A=\"Approved\",D=\"Deactivated\""
    },
    show_at: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "\"L\"=>Left,\"R\"=>Right"
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'testimonials',
    timestamps: false
  }) as typeof testimonials;
  }
}
