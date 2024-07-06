import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface affiliate_questionsAttributes {
  id: number;
  email: string;
  subject: string;
  questions: string;
}

export type affiliate_questionsPk = "id";
export type affiliate_questionsId = affiliate_questions[affiliate_questionsPk];
export type affiliate_questionsOptionalAttributes = "id";
export type affiliate_questionsCreationAttributes = Optional<affiliate_questionsAttributes, affiliate_questionsOptionalAttributes>;

export class affiliate_questions extends Model<affiliate_questionsAttributes, affiliate_questionsCreationAttributes> implements affiliate_questionsAttributes {
  id!: number;
  email!: string;
  subject!: string;
  questions!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof affiliate_questions {
    return sequelize.define('affiliate_questions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    questions: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    tableName: 'affiliate_questions',
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
  }) as typeof affiliate_questions;
  }
}
