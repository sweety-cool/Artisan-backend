import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface test_tableAttributes {
  id: number;
  name: string;
}

export type test_tablePk = "id";
export type test_tableId = test_table[test_tablePk];
export type test_tableOptionalAttributes = "id";
export type test_tableCreationAttributes = Optional<test_tableAttributes, test_tableOptionalAttributes>;

export class test_table extends Model<test_tableAttributes, test_tableCreationAttributes> implements test_tableAttributes {
  id!: number;
  name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof test_table {
    return sequelize.define('test_table', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'test_table',
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
  }) as typeof test_table;
  }
}
