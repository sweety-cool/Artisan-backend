import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface rejected_domainsAttributes {
  id: number;
  domain: string;
  status: number;
  creation_date: Date;
  created_by: number;
}

export type rejected_domainsPk = "id";
export type rejected_domainsId = rejected_domains[rejected_domainsPk];
export type rejected_domainsOptionalAttributes = "id" | "creation_date";
export type rejected_domainsCreationAttributes = Optional<rejected_domainsAttributes, rejected_domainsOptionalAttributes>;

export class rejected_domains extends Model<rejected_domainsAttributes, rejected_domainsCreationAttributes> implements rejected_domainsAttributes {
  id!: number;
  domain!: string;
  status!: number;
  creation_date!: Date;
  created_by!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof rejected_domains {
    return sequelize.define('rejected_domains', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    domain: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'rejected_domains',
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
  }) as typeof rejected_domains;
  }
}
