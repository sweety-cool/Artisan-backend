import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface admin_apprv_imgsAttributes {
  id: number;
  images: string;
}

export type admin_apprv_imgsPk = "id";
export type admin_apprv_imgsId = admin_apprv_imgs[admin_apprv_imgsPk];
export type admin_apprv_imgsOptionalAttributes = "id";
export type admin_apprv_imgsCreationAttributes = Optional<admin_apprv_imgsAttributes, admin_apprv_imgsOptionalAttributes>;

export class admin_apprv_imgs extends Model<admin_apprv_imgsAttributes, admin_apprv_imgsCreationAttributes> implements admin_apprv_imgsAttributes {
  id!: number;
  images!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof admin_apprv_imgs {
    return sequelize.define('admin_apprv_imgs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'admin_apprv_imgs',
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
  }) as typeof admin_apprv_imgs;
  }
}
