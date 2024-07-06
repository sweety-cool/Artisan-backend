import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface affiliate_paymentAttributes {
  id: number;
  buyer_affiliate_fee: string;
  buyer_min_amount: string;
  buyer_min_payout: string;
  buyer_max_payout: string;
  buyer_project_fee: string;
  programmer_affiliate_fee: string;
  programmer_min_amount: string;
  programmer_min_payout: string;
  programmer_max_payout: string;
  programmer_project_fee: string;
}

export type affiliate_paymentPk = "id";
export type affiliate_paymentId = affiliate_payment[affiliate_paymentPk];
export type affiliate_paymentOptionalAttributes = "id";
export type affiliate_paymentCreationAttributes = Optional<affiliate_paymentAttributes, affiliate_paymentOptionalAttributes>;

export class affiliate_payment extends Model<affiliate_paymentAttributes, affiliate_paymentCreationAttributes> implements affiliate_paymentAttributes {
  id!: number;
  buyer_affiliate_fee!: string;
  buyer_min_amount!: string;
  buyer_min_payout!: string;
  buyer_max_payout!: string;
  buyer_project_fee!: string;
  programmer_affiliate_fee!: string;
  programmer_min_amount!: string;
  programmer_min_payout!: string;
  programmer_max_payout!: string;
  programmer_project_fee!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof affiliate_payment {
    return sequelize.define('affiliate_payment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buyer_affiliate_fee: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    buyer_min_amount: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    buyer_min_payout: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    buyer_max_payout: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    buyer_project_fee: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    programmer_affiliate_fee: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    programmer_min_amount: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    programmer_min_payout: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    programmer_max_payout: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    programmer_project_fee: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    tableName: 'affiliate_payment',
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
  }) as typeof affiliate_payment;
  }
}
