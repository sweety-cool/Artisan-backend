
// import dotenv from "dotenv";
// import { Dialect } from "sequelize";

// dotenv.config();

// export default {
// 	// MySql
// 	host: 'localhost',
// 	user: 'jhunsin1_artisans',
// 	password: 'kVdTC4KxG5GXKo',
// 	db: 'jhunsin1_t_data',
// 	dialect: "mysql" as Dialect,
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		acquire: 1000000,
// 		idle: 10000,
// 	},
// };


import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

export default {
	// MySql
	host: '159.89.173.209',
	user: 'art',
	password: 'artisian',
	db: 'art',
	dialect: "mysql" as Dialect,
	pool: {
		max: 5,
		min: 0,
		acquire: 1000000,
		idle: 10000,
		port: 3306,
	},
};
