import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface footer_textAttributes {
  id: number;
  text: string;
  status: string;
  language: string;
}

export type footer_textPk = "id";
export type footer_textId = footer_text[footer_textPk];
export type footer_textOptionalAttributes = "id";
export type footer_textCreationAttributes = Optional<footer_textAttributes, footer_textOptionalAttributes>;

export class footer_text extends Model<footer_textAttributes, footer_textCreationAttributes> implements footer_textAttributes {
  id!: number;
  text!: string;
  status!: string;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof footer_text {
    return sequelize.define('footer_text', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'footer_text',
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
  }) as typeof footer_text;
  }
}
