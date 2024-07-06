import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface escrow_release_requestAttributes {
  id: number;
  transaction_id: string;
  request_date: string;
  status: string;
}

export type escrow_release_requestPk = "id";
export type escrow_release_requestId = escrow_release_request[escrow_release_requestPk];
export type escrow_release_requestOptionalAttributes = "id";
export type escrow_release_requestCreationAttributes = Optional<escrow_release_requestAttributes, escrow_release_requestOptionalAttributes>;

export class escrow_release_request extends Model<escrow_release_requestAttributes, escrow_release_requestCreationAttributes> implements escrow_release_requestAttributes {
  id!: number;
  transaction_id!: string;
  request_date!: string;
  status!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof escrow_release_request {
    return sequelize.define('escrow_release_request', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transaction_id: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    request_date: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    tableName: 'escrow_release_request',
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
  }) as typeof escrow_release_request;
  }
}
