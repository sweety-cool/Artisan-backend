import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface login_infoAttributes {
  id: number;
  user_id: number;
  ip_address: string;
  create_datetime: Date;
  status: '0' | '1';
}

export type login_infoPk = "id";
export type login_infoId = login_info[login_infoPk];
export type login_infoOptionalAttributes = "id" | "create_datetime" | "status";
export type login_infoCreationAttributes = Optional<login_infoAttributes, login_infoOptionalAttributes>;

export class login_info extends Model<login_infoAttributes, login_infoCreationAttributes> implements login_infoAttributes {
  id!: number;
  user_id!: number;
  ip_address!: string;
  create_datetime!: Date;
  status!: '0' | '1';


  static initModel(sequelize: Sequelize.Sequelize): typeof login_info {
    return sequelize.define('login_info', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    create_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "1",
      comment: "0=>delete, 1=>active"
    }
  }, {
    tableName: 'login_info',
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
  }) as typeof login_info;
  }
}
