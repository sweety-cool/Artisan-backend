import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dispute_agreeAttributes {
  id: number;
  case_id: number;
  buyer_agree: 'disagree' | 'agree';
  provider_agree: 'disagree' | 'agree';
  project_id: number;
}

export type dispute_agreePk = "id";
export type dispute_agreeId = dispute_agree[dispute_agreePk];
export type dispute_agreeOptionalAttributes = "id";
export type dispute_agreeCreationAttributes = Optional<dispute_agreeAttributes, dispute_agreeOptionalAttributes>;

export class dispute_agree extends Model<dispute_agreeAttributes, dispute_agreeCreationAttributes> implements dispute_agreeAttributes {
  id!: number;
  case_id!: number;
  buyer_agree!: 'disagree' | 'agree';
  provider_agree!: 'disagree' | 'agree';
  project_id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof dispute_agree {
    return sequelize.define('dispute_agree', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    case_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buyer_agree: {
      type: DataTypes.ENUM('disagree','agree'),
      allowNull: false
    },
    provider_agree: {
      type: DataTypes.ENUM('disagree','agree'),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'dispute_agree',
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
  }) as typeof dispute_agree;
  }
}
