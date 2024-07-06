import db from "@db/mysql";
import { initModels } from "./init-models";

const models = initModels(db.sequelize);

export default models;
