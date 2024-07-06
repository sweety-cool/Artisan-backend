import { Sequelize } from "sequelize";
import config from "@config/db";

const sequelize = new Sequelize(config.db, config.user, config.password, {
	host: config.host,
	dialect: config.dialect,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
	logging: process.env.NODE_ENV === "production" ? false : false,
	dialectOptions: {
		dateStrings: true,
		typeCast: true,
		decimalNumbers: true,
	},
	define: {
		timestamps: false,
	},
	timezone: "+05:30",
	// logging: false
});

const db = {
	sequelize: sequelize,
	Sequelize: Sequelize,
};
export default db;
