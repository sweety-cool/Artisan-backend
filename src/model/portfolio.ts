import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface portfolioAttributes {
  id: number;
  user_id: number;
  title: string;
  main_img: string;
  description: string;
  categories: string;
  attachment1: string;
  attachment2: string;
  attachment3: string;
  attachment4: string;
  attachment5: string;
}

export type portfolioPk = "id";
export type portfolioId = portfolio[portfolioPk];
export type portfolioOptionalAttributes = "id";
export type portfolioCreationAttributes = Optional<portfolioAttributes, portfolioOptionalAttributes>;

export class portfolio extends Model<portfolioAttributes, portfolioCreationAttributes> implements portfolioAttributes {
  id!: number;
  user_id!: number;
  title!: string;
  main_img!: string;
  description!: string;
  categories!: string;
  attachment1!: string;
  attachment2!: string;
  attachment3!: string;
  attachment4!: string;
  attachment5!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof portfolio {
    return sequelize.define('portfolio', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    main_img: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    categories: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    attachment1: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    attachment2: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    attachment3: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    attachment4: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    attachment5: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'portfolio',
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
  }) as typeof portfolio;
  }
}
