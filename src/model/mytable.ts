import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface mytableAttributes {
  primaryKey: string;
  field1: number;
  field2: number;
}

export type mytablePk = "primaryKey";
export type mytableId = mytable[mytablePk];
export type mytableCreationAttributes = mytableAttributes;

export class mytable extends Model<mytableAttributes, mytableCreationAttributes> implements mytableAttributes {
  primaryKey!: string;
  field1!: number;
  field2!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof mytable {
    return sequelize.define('mytable', {
    primaryKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    field1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    field2: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'mytable',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "primaryKey" },
        ]
      },
    ]
  }) as typeof mytable;
  }
}
