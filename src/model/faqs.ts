import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface faqsAttributes {
  id: number;
  faq_category_id: number;
  question: string;
  answer: string;
  is_frequent: string;
  created: number;
}

export type faqsPk = "id";
export type faqsId = faqs[faqsPk];
export type faqsOptionalAttributes = "id" | "is_frequent";
export type faqsCreationAttributes = Optional<faqsAttributes, faqsOptionalAttributes>;

export class faqs extends Model<faqsAttributes, faqsCreationAttributes> implements faqsAttributes {
  id!: number;
  faq_category_id!: number;
  question!: string;
  answer!: string;
  is_frequent!: string;
  created!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof faqs {
    return sequelize.define('faqs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    faq_category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_frequent: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N"
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'faqs',
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
  }) as typeof faqs;
  }
}
