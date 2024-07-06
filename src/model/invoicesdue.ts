import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface invoicesdueAttributes {
  id: number;
  inv_no: number;
  project_id: number;
  transaction_id: number;
  commission_rate: number;
  pdf_link: string;
  created_date: Date;
}

export type invoicesduePk = "id";
export type invoicesdueId = invoicesdue[invoicesduePk];
export type invoicesdueOptionalAttributes = "id";
export type invoicesdueCreationAttributes = Optional<invoicesdueAttributes, invoicesdueOptionalAttributes>;

export class invoicesdue extends Model<invoicesdueAttributes, invoicesdueCreationAttributes> implements invoicesdueAttributes {
  id!: number;
  inv_no!: number;
  project_id!: number;
  transaction_id!: number;
  commission_rate!: number;
  pdf_link!: string;
  created_date!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof invoicesdue {
    return sequelize.define('invoicesdue', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    inv_no: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commission_rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    pdf_link: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'invoicesdue',
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
  }) as typeof invoicesdue;
  }
}
