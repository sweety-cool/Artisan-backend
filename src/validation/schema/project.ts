import Joi from "joi";

export default {
	addProject: {
		project_name: Joi.string().required(),
		description: Joi.string().required(),
		visibility: Joi.string().required(),
		post_for: Joi.number().required(),
	},
	question: {
		project_id: Joi.string().required(),
		message: Joi.string().required(),
	},
	answer: {
		id: Joi.string().required(),
		message: Joi.string().required(),
	},
	get_temp: {
		project_ids: Joi.array().min(1).required(),
	},
	get_my_temp: {
		project_id: Joi.string().required(),
	},
	addBid: {
		bid_desc: Joi.string().required(),
		bid_amount: Joi.number().allow("").required(),
		bid_amount_gbp: Joi.number().allow("").required(),
		bid_days: Joi.number().required(),
		project_id: Joi.number().required(),
		user_id: Joi.number().required(),
	},

	updateBid: {
		bid_desc: Joi.string().required(),
		bid_amount: Joi.number().allow("").required(),
		bid_amount_gbp: Joi.number().allow("").required(),
		bid_days: Joi.number().required(),
		project_id: Joi.number().required(),
		user_id: Joi.number().required(),
	},
	send_msg: {
		project_id: Joi.number().required(),
		to_id: Joi.number().required(),
		message: Joi.string().required(),
	},

	send_bid_msg: {
		project_id: Joi.number().required(),
		send_to: Joi.number().required(),
		msg_box: Joi.string().required(),
	},
	list_msgs: {
		project_id: Joi.number().required(),
		to_id: Joi.number().required(),
		from_id: Joi.number().required(),
	},
	list_bid_msgs: {
		project_id: Joi.number().required(),
		to_id: Joi.number().required(),
		from_id: Joi.number().required(),
	},
	select_machinist: {
		programmer_id: Joi.string().required(),
		project_id: Joi.string().required(),
		bid_id: Joi.string().required(),
	},
	add_payment: {
		project_id: Joi.string().required(),
		amount: Joi.number().required(),
	},
    	update_balance: {
		project_id: Joi.string().required(),
		amount: Joi.number().required(),
	},
	review_machinist: {
		project_id: Joi.string().required(),
		comments: Joi.string().required(),
		provider_rate1: Joi.number().required(),
		provider_rate2: Joi.number().required(),
		provider_rate3: Joi.number().required(),
		provider_rate4: Joi.number().required(),
	},

	send_confirm: {
		project_id: Joi.number().required(),
		to_id: Joi.number().required(),
		message: Joi.string().required(),
		date: Joi.date().required(),
		from_id: Joi.number().required(),
	},
	send_shipping: {
		project_id: Joi.number().required(),
		to_id: Joi.number().required(),
		message: Joi.string().required(),
		date: Joi.date().required(),
		from_id: Joi.number().required(),
		tracking_no: Joi.string().required(),
	},
	addComment: {
		project_id: Joi.string().required(),
		description: Joi.string().required(),
	},
};
