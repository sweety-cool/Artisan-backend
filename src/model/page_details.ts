import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface page_detailsAttributes {
  id: number;
  page_url: string;
  page_title: string;
  page_desc: string;
  status: string;
  language: string;
}

export type page_detailsPk = "id";
export type page_detailsId = page_details[page_detailsPk];
export type page_detailsOptionalAttributes = "id";
export type page_detailsCreationAttributes = Optional<page_detailsAttributes, page_detailsOptionalAttributes>;

export class page_details extends Model<page_detailsAttributes, page_detailsCreationAttributes> implements page_detailsAttributes {
  id!: number;
  page_url!: string;
  page_title!: string;
  page_desc!: string;
  status!: string;
  language!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof page_details {
    return sequelize.define('page_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    page_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    page_title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    page_desc: {
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
    tableName: 'page_details',
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
  }) as typeof page_details;
  }
}
