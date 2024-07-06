import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface suspendAttributes {
  id: number;
  suspend_type: string;
  suspend_value: string;
  suspend_time: number;
}

export type suspendPk = "id";
export type suspendId = suspend[suspendPk];
export type suspendOptionalAttributes = "id";
export type suspendCreationAttributes = Optional<suspendAttributes, suspendOptionalAttributes>;

export class suspend extends Model<suspendAttributes, suspendCreationAttributes> implements suspendAttributes {
  id!: number;
  suspend_type!: string;
  suspend_value!: string;
  suspend_time!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof suspend {
    return sequelize.define('suspend', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    suspend_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    suspend_value: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "suspend_value"
    },
    suspend_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'suspend',
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
        name: "suspend_value",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "suspend_value" },
        ]
      },
    ]
  }) as typeof suspend;
  }
}
