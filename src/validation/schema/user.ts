import Joi from "joi";

export default {
	editUser: {
		name: Joi.string().required(),
		surname: Joi.string().required(),
		user_name: Joi.string().required(),
		zcode: Joi.required(),
		city: Joi.required(),
		country_code: Joi.number().required(),
		address1: Joi.required(),
		description: Joi.required(),
		service_desc: Joi.required(),
		tva: Joi.required(),
		company_name: Joi.required(),
		siren: Joi.required(),
		prof_pic: Joi.required(),
		prot_pic: Joi.required()	
	},
	editAddress: {
		name: Joi.string().required(),
		zcode: Joi.string().required(),
		city: Joi.string().required(),
		address1: Joi.string().required(),
	},
	change_password: {
		old_password: Joi.string().required(),
		new_password: Joi.string()
			.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
			.required()
			.messages({
				"string.pattern.base":
					"New Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
			}),
	},
};
