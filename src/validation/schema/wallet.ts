import Joi from "joi";

export default {
	pay_machinist: {
		project_id: Joi.string().required(),
	},
};
