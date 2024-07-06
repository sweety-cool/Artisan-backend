import SequelizeAuto, { AutoOptions } from "sequelize-auto";
import config from "@config/db";

const options: AutoOptions = {
	host: config.host,
	dialect: config.dialect,
	directory: "./src/model",
	lang: "ts",
	singularize: false,
	useDefine: true,
};
const auto = new SequelizeAuto(
	config.db,
	config.user,
	config.password,
	options,
);

auto.run().then();
