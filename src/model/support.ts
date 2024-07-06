import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface supportAttributes {
  id: number;
  callid: string;
  category: number;
  subject: string;
  description: string;
  priority: number;
  status: number;
  user_id: number;
  reply?: string;
}

export type supportPk = "id";
export type supportId = support[supportPk];
export type supportOptionalAttributes = "id" | "reply";
export type supportCreationAttributes = Optional<supportAttributes, supportOptionalAttributes>;

export class support extends Model<supportAttributes, supportCreationAttributes> implements supportAttributes {
  id!: number;
  callid!: string;
  category!: number;
  subject!: string;
  description!: string;
  priority!: number;
  status!: number;
  user_id!: number;
  reply?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof support {
    return sequelize.define('support', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    callid: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'support',
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
  }) as typeof support;
  }
}
