import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface affiliate_archiveAttributes {
  id: number;
  email: string;
  subject: string;
  questions: string;
  answer: string;
}

export type affiliate_archivePk = "id";
export type affiliate_archiveId = affiliate_archive[affiliate_archivePk];
export type affiliate_archiveOptionalAttributes = "id";
export type affiliate_archiveCreationAttributes = Optional<affiliate_archiveAttributes, affiliate_archiveOptionalAttributes>;

export class affiliate_archive extends Model<affiliate_archiveAttributes, affiliate_archiveCreationAttributes> implements affiliate_archiveAttributes {
  id!: number;
  email!: string;
  subject!: string;
  questions!: string;
  answer!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof affiliate_archive {
    return sequelize.define('affiliate_archive', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    questions: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'affiliate_archive',
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
  }) as typeof affiliate_archive;
  }
}
