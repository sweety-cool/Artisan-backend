import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface settings_ukAttributes {
  id: number;
  code: string;
  name: string;
  setting_type: string;
  value_type: string;
  int_value?: number;
  string_value?: string;
  text_value?: string;
  created: number;
}

export type settings_ukPk = "id";
export type settings_ukId = settings_uk[settings_ukPk];
export type settings_ukOptionalAttributes = "id" | "int_value" | "string_value" | "text_value";
export type settings_ukCreationAttributes = Optional<settings_ukAttributes, settings_ukOptionalAttributes>;

export class settings_uk extends Model<settings_ukAttributes, settings_ukCreationAttributes> implements settings_ukAttributes {
  id!: number;
  code!: string;
  name!: string;
  setting_type!: string;
  value_type!: string;
  int_value?: number;
  string_value?: string;
  text_value?: string;
  created!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof settings_uk {
    return sequelize.define('settings_uk', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    setting_type: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    value_type: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    int_value: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    string_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    text_value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'settings_uk',
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
  }) as typeof settings_uk;
  }
}
