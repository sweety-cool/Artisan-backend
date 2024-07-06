import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface admin_siteAttributes {
  site: string;
}

export type admin_siteCreationAttributes = admin_siteAttributes;

export class admin_site extends Model<admin_siteAttributes, admin_siteCreationAttributes> implements admin_siteAttributes {
  site!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof admin_site {
    return sequelize.define('admin_site', {
    site: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'admin_site',
    timestamps: false
  }) as typeof admin_site;
  }
}
