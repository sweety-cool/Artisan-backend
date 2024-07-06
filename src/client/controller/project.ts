import { response, Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest, UserAuthBufferRequest } from "@middleware/auth";
import models from "@model/index";
import db from "@db/mysql";
import { uploadFile, uploadMachiningFile, uploadOneFile, shippingmachiningfile, uploadsendmsgFile, uploadInvoice, uploadadditionalFile, deleteadditionalFile, deleteprofilepic, deleteportfoliopic, uploadbidfile } from "@helpers/upload";
import { Pick, Validate } from "validation/utils";
import schema from "validation/schema";
import moment from "moment";
import { Op, Sequelize } from "sequelize";
import { sendMail, site_mail_data } from "@helpers/mail";
import { float } from "aws-sdk/clients/lightsail";
import { jsPDF } from "jspdf";
import mail from "@config/mail";
import Stripe from "stripe";


// const stripe = new Stripe('sk_test_51P10WjSI5JkjOQYeRJzK1Jf8ZRSwvLKIU63oD7qQKL10vqYWIM2WLUsHUYkiWiY5j5wmPF7FVVwomeICaTUzirQ300yJv1rB05', {
// 	apiVersion: '2023-10-16',
// });


import { Cashfree } from "cashfree-pg";

const crypto = require("crypto")

Cashfree.XClientId = "TEST10167206cb646b2c5b786024977f60276101";
Cashfree.XClientSecret = "cfsk_ma_test_b809bfd74b8d6f8d8a03a303cd5f38df_5dd46c26";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		return R(res, true, "Test Route from Auth");
	}),

	list: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//pagination options


		const serverTime = moment().format('YYYY-MM-DD HH:mm:ss');
		console.log("server time---->", serverTime);

		console.log("The date fro test is-----", new Date().toLocaleString());







		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
			user_id: req.query.user_id?.toString() || null,
		};

		let userQuery = opt.user_id
			? {
				creator_id: opt.user_id,
			}
			: {};

		console.log("going for plist")

		const projects = await models.projects.findAndCountAll({
			where: {
				...userQuery,
				country_code: 2
			},
			include: [

				{
					model: models.users,
					as: "creator",
					attributes: ["id", "email", "user_name", "role_id"],
					required: false,
				},
			],
			attributes: [
				"id",
				"project_name",
				"project_image",
				"created",
				"enddate",
				"description",
				"project_status",
				"visibility",
				"project_post_date",
				"project_post_format_date",
				"project_expiry_date",
				"post_for",
				"programmer_id",
				"pro_job",
				"createdAt",
				"show_release",
				"is_private",
				"creator_id",
				"attachment_name",
				[
					db.sequelize.literal(
						`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
					),
					"bids_count",
				],
			],
			limit: opt.limit,
			offset: opt.page * opt.limit,
			order: [["project_post_format_date", "DESC"]],
		});
		//console.log("projects--",projects)

		let list = projects.rows;
		let count = projects.count;

		return R(res, true, "project listssss", list, {
			current_page: opt.page,
			total_count: count,
			total_pages: Math.floor(count / opt.limit),
		});
	}),
	my: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//pagination options
		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "1000"),
			user_id: req.query.user_id?.toString() || null,
		};

		let user = await models.users.findByPk(req.user?.id, {
			attributes: ["id", "role_id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}
		if (user.role_id == 1) {
			const projects = await models.projects.findAndCountAll({
				where: {
					creator_id: user.id,
				},
				include: [
					{
						model: models.project_images,
						as: "project_images",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},
						required: false,
					},
					{
						model: models.users,
						as: "creator",
						attributes: ["email", "user_name"],
						required: false,
					},

					{
						model: models.users,
						as: "programmer",
						attributes: ["email", "user_name"],
						required: false,
					},
				],
				attributes: [
					"id",
					"project_name",
					"project_image",
					"created",
					"enddate",
					"description",
					"project_status",
					"visibility",
					"project_post_date",
					"post_for",
					"createdAt",
					[
						db.sequelize.literal(
							`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
						),
						"bids_count",
					],
				],
				limit: opt.limit,
				offset: opt.page * opt.limit,
				order: [["createdAt", "DESC"]],
			});

			let list = projects.rows;
			let count = projects.count;

			return R(res, true, "project list", list, {
				current_page: opt.page,
				total_count: count,
				total_pages: Math.floor(count / opt.limit),
			});
		} else if (user.role_id == 2) {
			let status = req.query.status;

			if (!status) {
				return R(res, false, "please provide a status");
			}

			if (status == "1") {

				console.log("status 1 call --------------->>>>>>")
				const projects = await models.projects.findAll({
					where: {
						programmer_id: user.id,
					},
					include: [
						{
							model: models.project_images,
							as: "project_images",
							where: {
								project_id: { [Op.col]: "projects.id" },
							},
							required: false,
						},
						{
							model: models.users,
							as: "creator",
							attributes: ["email", "user_name"],
							required: false,
						},


						{
							model: models.users,
							as: "programmer",
							attributes: ["email", "user_name"],
							required: false,
						},


					],
					attributes: [
						"id",
						"project_name",
						"project_image",
						"created",
						"enddate",
						"description",
						"project_status",
						"visibility",
						"project_post_date",
						"post_for",
						"createdAt",
						[
							db.sequelize.literal(
								`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
							),
							"bids_count",
						],
					],
					limit: opt.limit,
					offset: opt.page * opt.limit,
					order: [["createdAt", "DESC"]],
				});


				let count = projects.length;
				console.log("st-1 count-->>", count);

				return R(res, true, "project list", projects, {
					current_page: opt.page,
					total_count: count,
					total_pages: Math.floor(count / opt.limit),
				});
			} else if (status == "2") {

				console.log("status 2 call --------------->>>>>>")
				let bids = await models.bids.findAll({
					where: {
						user_id: user.id,
					},
					attributes: ["id", "user_id", "project_id"],
				});

				if (!bids.length) {
					return R(res, true, "No Data Found", []);
				}

				let ids = bids.map((b) => b.project_id) as number[];

				//console.log("ids len", ids);


				const projects = await models.projects.findAndCountAll({
					where: {
						//programmer_id: user.id,
						id: {
							[Op.in]: ids,
						},
						project_status: 0
					},
					include: [
						{
							model: models.project_images,
							as: "project_images",
							where: {
								project_id: { [Op.col]: "projects.id" },
							},
							required: false,
						},
						{
							model: models.users,
							as: "creator",
							attributes: ["email", "user_name"],
							required: false,
						},
					],
					attributes: [
						"id",
						"project_name",
						"project_image",
						"created",
						"enddate",
						"description",
						"project_status",
						"visibility",
						"project_post_date",
						"post_for",
						"createdAt",
						[
							db.sequelize.literal(
								`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
							),
							"bids_count",
						],
					],
					limit: opt.limit,
					offset: opt.page * opt.limit,
					order: [["createdAt", "DESC"]],
				});

				console.log("bid projects---====>>>", projects);


				let list = projects.rows;
				let count = projects.count;
				console.log("st-2 count-->>", count);

				return R(res, true, "project list", list, {
					current_page: opt.page,
					total_count: count,
					total_pages: Math.floor(count / opt.limit),
				});
			} else if (status == "3") {

				console.log("status 3 call --------------->>>>>>")
				const projects = await models.projects.findAndCountAll({
					where: {
						programmer_id: user.id,
						project_status: 4
					},
					include: [
						{
							model: models.project_images,
							as: "project_images",
							where: {
								project_id: { [Op.col]: "projects.id" },
							},
							required: false,
						},
						{
							model: models.users,
							as: "creator",
							attributes: ["email", "user_name"],
							required: false,
						},
					],
					attributes: [
						"id",
						"project_name",
						"project_image",
						"created",
						"enddate",
						"description",
						"project_status",
						"visibility",
						"project_post_date",
						"post_for",
						"createdAt",
						[
							db.sequelize.literal(
								`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
							),
							"bids_count",
						],
					],
					limit: opt.limit,
					offset: opt.page * opt.limit,
					order: [["createdAt", "DESC"]],
				});

				let list = projects.rows;
				let count = projects.count;
				console.log("st-3 count-->>", count);

				return R(res, true, "project list", list, {
					current_page: opt.page,
					total_count: count,
					total_pages: Math.floor(count / opt.limit),
				});
			}
			else if (status == "5") {

				const projects = await models.projects.findAndCountAll({
					where: {
						programmer_id: user.id,
						project_status: 1
					},
					include: [
						{
							model: models.project_images,
							as: "project_images",
							where: {
								project_id: { [Op.col]: "projects.id" },
							},
							required: false,
						},
						{
							model: models.users,
							as: "creator",
							attributes: ["email", "user_name"],
							required: false,
						},
					],
					attributes: [
						"id",
						"project_name",
						"project_image",
						"created",
						"enddate",
						"description",
						"project_status",
						"visibility",
						"project_post_date",
						"post_for",
						"createdAt",
						[
							db.sequelize.literal(
								`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
							),
							"bids_count",
						],
					],
					limit: opt.limit,
					offset: opt.page * opt.limit,
					order: [["createdAt", "DESC"]],
				});

				let list = projects.rows;
				let count = projects.count;
				console.log("status 5 award but nf-->", list);

				return R(res, true, "project list", list, {
					current_page: opt.page,
					total_count: count,
					total_pages: Math.floor(count / opt.limit),
				});


			}
			else if (status == "6") {
				const projects = await models.projects.findAndCountAll({
					where: {
						programmer_id: user.id,
						project_status: 5
					},
					include: [
						{
							model: models.project_images,
							as: "project_images",
							where: {
								project_id: { [Op.col]: "projects.id" },
							},
							required: false,
						},
						{
							model: models.users,
							as: "creator",
							attributes: ["email", "user_name"],
							required: false,
						},
					],
					attributes: [
						"id",
						"project_name",
						"project_image",
						"created",
						"enddate",
						"description",
						"project_status",
						"visibility",
						"project_post_date",
						"post_for",
						"createdAt",
						[
							db.sequelize.literal(
								`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
							),
							"bids_count",
						],
					],
					limit: opt.limit,
					offset: opt.page * opt.limit,
					order: [["createdAt", "DESC"]],
				});

				let list = projects.rows;
				let count = projects.count;
				console.log("status 6 final without rev-->", list);
				return R(res, true, "project list", list, {
					current_page: opt.page,
					total_count: count,
					total_pages: Math.floor(count / opt.limit),
				});
			}
			else {
				const projects = await models.projects.findAndCountAll({
					where: {
						programmer_id: user.id,
						project_status: 5
					},
					include: [
						{
							model: models.project_images,
							as: "project_images",
							where: {
								project_id: { [Op.col]: "projects.id" },
							},
							required: false,
						},
						{
							model: models.users,
							as: "creator",
							attributes: ["email", "user_name"],
							required: false,
						},
					],
					attributes: [
						"id",
						"project_name",
						"project_image",
						"created",
						"enddate",
						"description",
						"project_status",
						"visibility",
						"project_post_date",
						"post_for",
						"createdAt",
						[
							db.sequelize.literal(
								`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
							),
							"bids_count",
						],
					],
					limit: opt.limit,
					offset: opt.page * opt.limit,
					order: [["createdAt", "DESC"]],
				});

				let list = projects.rows;
				let count = projects.count;
				console.log("othereas----------->>>", list);
				return R(res, true, "project list", list, {
					current_page: opt.page,
					total_count: count,
					total_pages: Math.floor(count / opt.limit),
				});

			}
		} else {
			return R(res, false, "Invalid User");
		}
	}),
	show: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//pagination options
		let project_id = req.query.id;

		if (!project_id) {
			return R(res, false, "please provide a project ID");
		}

		const project = await models.projects.findOne({
			where: {
				id: project_id.toString(),
			},
			include: [
				{
					model: models.project_images,
					as: "project_images",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					required: false,
				},
				{
					model: models.bids,
					as: "bids",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					include: [
						{
							model: models.users,
							as: "user",
							attributes: ["email", "user_name", "pro_vat", "pro_user", "prof_pic", "logo"],
							required: false,
						},
						// {
						// 	model: models.messages,
						// 	as: "messages",
						// 	where:{
						// 		project_id: { [Op.col]: "projects.id" },
						// 		[Op.or]: [
						// 			{
						// 				to_id: { [Op.col]: "projects.bids.user_id" },
						// 				from_id: {[Op.col]: "projects.creator_id" },
						// 			},
						// 			{
						// 				to_id: {[Op.col]: "projects.creator_id"},
						// 				from_id: { [Op.col]: "projects.bids.user_id" },
						// 			},
						// 		],
						// 	},
						// 	limit:2,
						// 	required: false,

						// },
					],
					required: false,
				},
				{
					model: models.users,
					as: "creator",
					attributes: ["id", "email", "user_name"],
					required: false,
				},
				{
					model: models.users,
					as: "programmer",
					attributes: ["id", "email", "user_name", "prof_pic", "logo"],
					required: false,
				},
				{
					model: models.prebid_messages,
					as: "prebid_messages",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					include: [
						{
							model: models.users,
							as: "from",
							attributes: ["email", "user_name"],
							required: false,
						},
					],
					required: false,
				},
			],

			attributes: {
				include: [
					[
						db.sequelize.literal(
							`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
						),
						"bids_count",
					],
				],
			},
		});

		if (!project) {
			return R(res, false, "No project found");
		}

		return R(res, true, "project details", project);
	}),
	askQuestion: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_id", "message"],
			schema.project.question,
			req.body,
			{},
		);

		let user = await models.users.findByPk(req.user?.id, {
			attributes: ["id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		let project = await models.projects.findByPk(data.project_id, {
			attributes: ["id", "creator_id", "project_name"],
		});
		console.log("project name", project?.project_name)
		if (!project) {
			return R(res, false, "Project not found");
		}

		data["from_id"] = user.id;
		data["to_id"] = project.creator_id;
		data["msg_type"] = "Q";

		data["buyer_message_status"] = "U";
		data["created"] = moment().unix();
		data["notification_status"] = "P";

		let question = await models.prebid_messages.create(data);
		let custemail = await models.users.findOne({ where: { id: project.creator_id } })



		const api_data_rep: object = {
			"!customer_name": custemail?.name,
			"!project_name": project?.project_name,
			"!response": question.message,
			"!project_url": `${mail.mailbaseurl}machining/${project.project_name.split(" ").join("-")}-${project?.id}`,
		}



		let task_id = 90;
		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en"
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});
		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;
		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, api_data_rep[key])
			}
			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, api_data_rep[key])
			}
			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, api_data_rep[key])
			}
		});
		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, site_mail_data[key])
			} if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, site_mail_data[key])
			} if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, site_mail_data[key])
			}
		})




		await sendMail({ to: custemail?.email, subject, body });
		return R(res, true, "Question Submitted", question);
	}),



	addAnswer: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.answer, req.body, {});

		let user = await models.users.findByPk(req.user?.id, {
			attributes: ["id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		let question = await models.prebid_messages.findByPk(data.id);

		if (!question) {
			return R(res, false, "Question Not Found", null);
		}

		let q = question.toJSON();

		let project = await models.projects.findByPk(q.project_id, {
			attributes: ["id", "creator_id", "project_name"],
		});

		let supplieremail = await models.users.findOne({ where: { id: q.from_id } })

		let answer = await models.prebid_messages.create({
			project_id: q.project_id,
			reply_for: q.id,
			from_id: user.id,
			to_id: q.from_id,
			message: data.message,
			msg_type: "A",
			programmer_message_status: "U",
			buyer_message_status: "R",
			created: moment().unix(),
			notification_status: "P"

		});
		console.log("answer msg", answer)

		const api_data_rep: object = {
			"!supplier_name": supplieremail?.name,
			"!project_name": project?.project_name,
			"!response": data.message,
			"!project_url": `${mail.mailbaseurl}machining/${project?.project_name.split(" ").join("-")}-${project?.id}`,
		}



		let task_id = 94;
		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en"
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});
		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;
		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, api_data_rep[key])
			}
			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, api_data_rep[key])
			}
			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, api_data_rep[key])
			}
		});
		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, site_mail_data[key])
			} if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, site_mail_data[key])
			} if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, site_mail_data[key])
			}
		})




		sendMail({ to: supplieremail?.email, subject, body });
		return R(res, true, "Answer Submitted", answer);
	}),

	add: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		console.log("add hitting....")
		let data = await Validate(
			res,
			["project_name", "description", "visibility", "post_for"],
			schema.project.addProject,
			req.body,
			{},
		);
		console.log("data for project----->>", data)

		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
		});

		//console.log("user",user)

		if (!user) {
			return R(res, false, "Invalid user");
		}

		// file upload
		let files = await uploadFile(req, res);


		const momentDt = moment();
		console.log("current moemt is----", momentDt);
		const mString = moment().format('YYYY-MM-DD HH:mm:ss');
		//console.log("current moemt form sa is----",momentform);
		//const serverTime = moment().unix();
		//const serverTime2 = moment.unix(serverTime).format('YYYY-MM-DD HH:mm:ss')
		const currentDate = new Date(mString);

		console.log("current date is----", currentDate);
		// Get the date components
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');
		console.log("current datessbs is----", year, month, day);
		// Get the time components
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');
		const seconds = String(currentDate.getSeconds()).padStart(2, '0');
		console.log("current datessbs is----", hours, minutes, seconds);
		// Format the date and time
		const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		console.log("current datessbs is----", formattedDateTime);
		// Print the result
		//data["project_post_format_date"] = formattedDateTime
		let curr = moment().format('YYYY-MM-DD HH:mm:ss');
		data["project_post_format_date"] = String(curr);
		console.log("data[project_post_format_date]-----", data["project_post_format_date"]);



		if (data.visibility.toLowerCase() == "private") {
			data["is_private"] = 1;
			data["pro_job"] = 0;
			data["visibility"] = "Private";
		} else if (data.visibility.toLowerCase() == "public") {
			data["pro_job"] = 0;
			data["is_private"] = 0;
			data["visibility"] = "Public";
		}
		else if (data.visibility.toLowerCase() == "pro") {
			data["pro_job"] = 1;
			data["is_private"] = 0;
			data["visibility"] = "Pro";
		}

		data["show_release"] = 0

		data["country_code"] = 2;
		data["site_uk"] = 1;
		data["creator_id"] = user.id;
		data["project_post_date"] = moment().format("YYYY-MM-DD");

		console.log("project post date1234--->>", data["project_post_date"]);



		const mString2 = moment().format('YYYY-MM-DD HH:mm:ss');
		const now = new Date(mString2);
		const afterDays = new Date(now.setDate(now.getDate() + data.post_for));
		data["project_expiry_date"] = afterDays.toISOString().slice(0, 10);

		data["post_for"] = moment().add(data.post_for, "days").unix();
		data["created"] = moment().add(data.created, "days").unix();
		data["start"] = moment().add(data.created, "days").unix();
		let concatenatedData = files.join(',');
		data["attachment_name"] = concatenatedData
		// project_exp_date = YYYY MM DD

		let project = await models.projects.create(data);
		console.log("going..")


		let providers = await models.users.findAll({
			where: {
				role_id: 2
			},
			attributes: ["user_name", "email"]
		})

		let providers_name: string[] = [];

		providers.forEach(e => {
			providers_name.push(String(e.user_name))
		})

		let providers_email: string[] = [];

		providers.forEach(e => {
			providers_email.push(String(e.email))
		})

		const api_data_rep: object = {
			"!username": user.user_name,
		}

		let task_id = 85;

		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en"
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});

		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;

		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, api_data_rep[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, api_data_rep[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, api_data_rep[key])
			}

		});


		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


			if (body?.includes(key)) {

				var re = new RegExp(key, 'g');

				body = body.replace(re, site_mail_data[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, site_mail_data[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, site_mail_data[key])
			}

		})
		//sendMail({to: user.email, subject, body});



		if (data.visibility.toLowerCase() == "private") {

			const api_data_rep: object = {
				"!username": user.user_name,
				"!projectid": project.id,
				"!projectname": project.project_name,
				"!date": project.createdAt,
				"!profile": user.user_name,
				"!privateproviders": providers_name

			}




			let task_id = 29;

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}




			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}
			})

			//sendMail(user.email, subject, body);

			// email to supplier

			const api_data_rep_sup: object = {
				"!username": user.user_name,  // change 
				"!creatorname": user.user_name,
				"!projectid": project.id,
				"!projectname": project.project_name,
				"!projecturl": `${mail.mailbaseurl}project/${project.project_name}/${project.id}`

			}




			let supplier_task_id = 30;

			const mailDataSupp = await models.email_templates.findOne({
				where: {
					id: supplier_task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body_sup = mailDataSupp?.mail_body;
			var title_sup = mailDataSupp?.title;
			var subject_sup = mailDataSupp?.mail_subject;

			(Object.keys(api_data_rep_sup) as (keyof typeof api_data_rep_sup)[]).forEach(key => {
				if (body_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					body_sup = body_sup.replace(re, api_data_rep_sup[key])
				}

				if (title_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					title_sup = title_sup.replace(re, api_data_rep_sup[key])
				}

				if (subject_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject_sup = subject_sup.replace(re, api_data_rep_sup[key])
				}




			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body_sup?.includes(key)) {

					var re = new RegExp(key, 'g');

					body_sup = body_sup.replace(re, site_mail_data[key])
				}

				if (title_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					title_sup = title_sup.replace(re, site_mail_data[key])
				}

				if (subject_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject_sup = subject_sup.replace(re, site_mail_data[key])
				}
			})

			//sendMail({to: providers_email, subject: subject_sup, body: body_sup});


		}

		return R(res, true, "Project Added Successfully", {
			project,

		});
	}),

	add_temp: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_name", "description", "visibility", "post_for"],
			schema.project.addProject,
			req.body,
			{},
		);

		let temp_id = req.query?.temp_id;
		let project: any;

		if (temp_id) {
			project = await models.projects_temp.findByPk(temp_id?.toString());
			if (!project) {
				return R(res, false, "Invalid Project");
			}
		}

		// file upload
		let files = await uploadFile(req, res);





		const currentDate = new Date();

		// Get the date components
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');

		// Get the time components
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');
		const seconds = String(currentDate.getSeconds()).padStart(2, '0');

		// Format the date and time
		const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		// Print the result
		let t = moment();
		data["project_post_format_date"] = t.format('YYYY-MM-DD HH:mm:ss');
		console.log("project_post_format_date is", t)



		if (data.visibility.toLowerCase() == "private") {
			data["is_private"] = 1;
		} else {
			data["is_private"] = 0;
		}
		data["country_code"] = 2;
		data["creator_id"] = 0;
		data["project_post_date"] = moment().format("YYYY MM DD");

		const now = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
		const afterDays = new Date(now.setDate(now.getDate() + data.post_for));
		data["project_expiry_date"] = afterDays.toISOString().slice(0, 10);

		data["post_for"] = moment().add(data.post_for, "days").unix();
		data["created"] = moment().add(data.created, "days").unix();
		// project_exp_date = YYYY MM DD

		if (project) {
			data["images"] = [...project.images, ...files];
			return R(res, true, "Project will be posted after you log in", project);
		} else {
			data["images"] = files;
		}

		project = await models.projects_temp.create(data);

		return R(res, true, "Project will be posted after you log in", project);
	}),
	add_bid: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.addBid, req.body, {});

		if (req.user?.id != data.user_id) {
			return R(res, false, "	Invalid	User");
		}

		let project = await models.projects.findByPk(data.project_id);

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		if (project.programmer_id) {
			return R(res, false, "Job already assigned to a machinist");
		}

		// file upload



		if (req.files?.file) {
			let file = await uploadbidfile(req, res);
			let concatenatedData = file.join(',');
			data["bid_file"] = concatenatedData;
		}


		if (data?.bid_amount == 0) {
			data["no_offer"] = 2
		} else {
			data["no_offer"] = 1
		}


		data["bid_time"] = moment().unix()

		//console.log("bid details-->", data);
		//let euro: any= await models.euro_to_gbp.findOne();
		let euro: any = await db.sequelize.query('SELECT rate_ratio FROM euro_to_gbp LIMIT 1');
		// let res
		// let bid_amt = res[0][0]
		console.log("euro--", euro);

		//data["amount_gbp"] = euro?.rate_ratio;
		data["bid_amount"] = euro[0][0].rate_ratio * data.bid_amount_gbp;
		if (data.bid_amount == '') {
			data.bid_amount = euro[0][0].rate_ratio * data.bid_amount_gbp;
			//data.bid_amount = 0;
		}



		if (data.bid_amount_gbp == '') {
			data.bid_amount_gbp = 0;
		}
		//console.log("bid details-->", data);

		let bid = await models.bids.create(data);


		///////////////////////////////////////////////////////////////////////////////////////

		if (data.bid_amount == 0 && data.bid_amount_gbp == 0) {

			let progemail = await models.users.findOne({
				where: {
					id: bid.user_id
				}
			})


			const api_data_rep: object = {
				"!supplier": progemail?.user_name,
				"!project_title": String(project.project_name),
				"!supplier_email": progemail?.email,
				"!project_name": String(project.project_name),
				"!project_url": `${mail.mailbaseurl}machining/${project.project_name.split(" ").join("-")}-${project?.id}`
			}






			let task_id = 182;

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}
			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}
			})

			let custemail = await models.users.findOne({
				where: {
					id: project.creator_id
				}
			})

			//let type = "profile_update";
			// await user.save();
			sendMail({ to: custemail?.email, subject, body });

		}
		else {

			let progemail = await models.users.findOne({
				where: {
					id: bid.user_id
				}
			})


			const api_data_rep: object = {
				"!supplier_name": progemail?.user_name,
				"!project_name": String(project.project_name),
				"!supplier_email": progemail?.email,
				"!project_details": `${mail.mailbaseurl}machining/${project.project_name.split(" ").join("-")}-${project?.id}`,

			}




			let task_id = 84;

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}
			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}
			})

			let custemail = await models.users.findOne({
				where: {
					id: project.creator_id
				}
			})

			//let type = "profile_update";
			// await user.save();
			sendMail({ to: custemail?.email, subject, body });

		}

		return R(res, true, "Offer Submitted", bid);
	}),
	update_bid: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.updateBid, req.body, {});

		if (req.user?.id != data.user_id) {
			return R(res, false, "	Invalid	User");
		}

		let bid_id = req.query?.id || "";

		if (!bid_id) {
			return R(res, false, "No Bid ID Found");
		}

		let bid = await models.bids.findByPk(bid_id.toString());

		if (!bid) {
			return R(res, false, "No Bid Found");
		}
		let euro: any = await db.sequelize.query('SELECT rate_ratio FROM euro_to_gbp LIMIT 1');
		console.log("euro--", euro);

		//data["amount_gbp"] = euro?.rate_ratio;
		data["bid_amount"] = euro[0][0].rate_ratio * data.bid_amount_gbp;

		if (data?.bid_amount == 0) {
			data["no_offer"] = 2
		} else {
			data["no_offer"] = 1
		}

		// file upload


		await bid.update(data);

		console.log("Files are:-", req.files);

		const date = moment.unix(Number(bid?.bid_time));

		const year = date.format('YYYY');
		const month = date.format('MMMM');


		if (req.files?.file) {
			//let file = await uploadFile(req, res);
			let file = await uploadbidfile(req, res);
			let concatenatedData = file.join(',');
			if (bid?.bid_file != null && bid?.bid_file != "") {
				bid.update({ bid_file: Sequelize.literal(`concat(bid_file, ',', '${concatenatedData}')`) })
			} else {
				bid?.update({ bid_file: concatenatedData })
			}
		}

		let task_id = 86;

		let machinist = await models.users.findOne({
			where: {
				id: data.user_id
			}
		})

		let project = await models.projects.findOne({
			where: {
				id: data.project_id
			}
		})

		let customer = await models.users.findOne({
			where: {
				id: project?.creator_id
			}
		})

		const api_data_rep: object = {
			"!provider_name": machinist?.user_name,
			"!project_name": project?.project_name,
			"!project_url": `${mail.mailbaseurl}`
		}

		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en"
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});

		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;

		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, api_data_rep[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, api_data_rep[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, api_data_rep[key])
			}




		});


		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


			if (body?.includes(key)) {

				var re = new RegExp(key, 'g');

				body = body.replace(re, site_mail_data[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, site_mail_data[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, site_mail_data[key])
			}
		})
		let b2 = `<p>!provider_name modified his&nbsp;offer for your project &quot;!project_name&quot;.</p><p>To see the updated offer: <a href="!project_url">click here</a></p><p>Kind Regards,</p><p>!site_name</p><p>!site_url</p>`

		console.log("email for edit bid------>>>>>>", customer?.email, subject, `${body}`);

		sendMail({ to: customer?.email, subject, body: String(body) });

		return R(res, true, "Offer updated", bid);
	}),

	select_machinist: asyncWrapper(
		async (req: UserAuthRequest, res: Response) => {
			// validation
			let data = await Validate(
				res,
				[],
				schema.project.select_machinist,
				req.query,
				{},
			);


			let buyer = await models.users.findOne({
				where: {
					id: req.user?.id
				},
				attributes: ["user_name", "email"]
			})

			let project = await models.projects.findByPk(data.project_id, {
				attributes: ["id", "programmer_id", "project_name"],
			});

			if (!project) {
				return R(res, false, "Invalid Project");
			}

			if (project.programmer_id) {
				return R(res, false, "Job already assigned to a machinist");
			}



			let user = await models.users.findByPk(data.programmer_id, {
				attributes: ["id", "user_name", "email"],
			});

			if (!user) {
				return R(res, false, "Invalid	 user");
			}

			let bid = await models.bids.findByPk(data.bid_id);

			if (!bid) {
				return R(res, false, "Invalid	 Bid");
			}
			var bidTime = new Date();
			project.programmer_id = user.id;
			project.project_status = '1';
			project.bid_select_date = bidTime;
			project.project_award_date_format = bidTime;
			project.project_award_date = moment().unix();
			await project.save();

			if (!req.user?.id) {
				return R(res, false, "");
			}
			var today = new Date();




			const cdate = new Date()
			let notifdata: any = {
				email_type: "Machinist selected",
				email_subject: "Machinist selected",
				supplier_id: project.programmer_id,
				email_body: `Dear ${user?.user_name},\n Congratulations! You've just been selected for the project ${project?.project_name}.\n Please be aware that the order isn't yet finalized. Once the client has funded the project, we will notify you by email, and you'll be ready to start working on this order.\nKind Regards,\nMachining-4u\nwww.machining-4u.co.uk`,
				notif_date: cdate,
				message_status: "R",
				project_id: project?.id,
				customer_id: req?.user.id
			}


			let notifs = await models.notif_email_list.create(notifdata)
			//console.log("notif created -->", notifs);
			let task_id = 95;

			const api_data_rep: object = {
				"!project_title": project.project_name,
				"!programmer_name": user?.user_name

			}

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}




			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}
			})

			sendMail({ to: user.email, subject, body });

			return R(res, true, "Machinist selected");
		},
	),
	add_payment: asyncWrapper(async (req: any, res: Response) => {

		console.log("req.bod webhook", req.body)
		const rawBody = JSON.stringify(req.body);
		try {

			let {
				order_id, project_id
			} = req.body;

			let verifiedresult = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id)
			console.log("verifiedresult", verifiedresult)
			//return R(res, true, "Payment verified!")




			// Update in DB




			let project = await models.projects.findOne({
				where: {
					id: project_id.toString(),
				},
				include: [
					{
						model: models.project_images,
						as: "project_images",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},
						required: false,
					},
					{
						model: models.bids,
						as: "bids",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},
						include: [
							{
								model: models.users,
								as: "user",
								attributes: ["email", "user_name"],
								required: false,
							},
						],
						required: false,
					},
					{
						model: models.users,
						as: "creator",
						attributes: ["email", "user_name", "id"],
						required: false,
					},
					{
						model: models.users,
						as: "programmer",
						attributes: ["email", "user_name", "id"],
						required: false,
					},
					{
						model: models.prebid_messages,
						as: "prebid_messages",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},
						include: [
							{
								model: models.users,
								as: "from",
								attributes: ["email", "user_name"],
								required: false,
							},
						],
						required: false,
					},
				],

				attributes: {
					include: [
						[
							db.sequelize.literal(
								`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
							),
							"bids_count",
						],
					],
				},
			});



			if (!project) {
				return R(res, false, "Project not found");
			}


			// let buyer = await models.users.findOne({
			// 	where: {
			// 		id: req.user?.id
			// 	},
			// 	attributes: ["user_name", "email"]
			// })
			let bid: any = await models.bids.findOne({
				where: {
					project_id: project.id,
					user_id: project.programmer_id
				},
			});

			if (!bid) {
				return R(res, false, "Invalid	 Bid");
			}


			var today = new Date();

			let transaction_details = await models.transactions.create({
				amount: (bid?.bid_amount_gbp) / 0.79,
				amount_gbp: bid.bid_amount || 0,

				type: "Escrow Transfer",


				creator_id: req.user?.id,
				buyer_id: req.user?.id,


				provider_id: project.programmer_id,
				reciever_id: project.programmer_id,

				status: "success",
				country_code: 2,
				transaction_time: moment().unix(),

				description: "Paypal",
				user_type: "customer",
				project_id: project.id,

			});


			project.project_status = "4";
			project.project_fund_date_format = today;

			await project.save();




			let supplier = await models.users.findOne({
				where: {
					id: project.programmer_id
				}
			})

			let task_id = 107;

			const api_data_rep: object = {
				"!project_title": project.project_name,
				"!supplier_username": supplier?.user_name,
				"!bid_amount": transaction_details.amount_gbp,
				"!shipping_date": project.bids[0].bid_days,
				"!amount": (transaction_details.amount_gbp) * (100 - 14.9) / 100,
				"!project_url": `${mail.mailbaseurl}project/${project.project_name}/${project.id}`

			}

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}




			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}
			})

			sendMail({ to: supplier?.email, subject, body });

			// notification to supplier

			//console.log("notif -->",notifs);

			let user = await models.users.findOne({
				where: {
					id: project.creator_id
				}
			})

			let task_id_cust = 106;

			const api_data_rep_cus: object = {
				"!project_title": project.project_name,
				"!username": user?.user_name,
				"!bid_amount": transaction_details.amount,
				"!withdraw_url": `${mail.mailbaseurl}auth/sign-in`,
				"!amount": transaction_details.amount_gbp,
				"!supplier_name": supplier?.user_name,
				"!delvry_date": project.bids[0].bid_days
			}

			const mailData_cus = await models.email_templates.findOne({
				where: {
					id: task_id_cust,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData_cus?.mail_body;
			var title = mailData_cus?.title;
			var subject = mailData_cus?.mail_subject;

			(Object.keys(api_data_rep_cus) as (keyof typeof api_data_rep_cus)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep_cus[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep_cus[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep_cus[key])
				}




			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}
			})

			sendMail({ to: user?.email, subject, body });



			return R(res, true, "Payment is done ", { project });





		} catch (error) {
			console.log(error)
			return R(res, false, "Not verified!", { error: error });
		}


	}),









	after_cashfree: asyncWrapper(async (req: any, res: Response) => {

		console.log("req.body is", req.body)
		try {

			let {
				order_id, project_id
			} = req.body;

			let verifiedresult = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id)
			console.log("verifiedresult", verifiedresult)
			//return R(res, true, "Payment verified!")




			// Update in DB




			let project = await models.projects.findOne({
				where: {
					id: project_id.toString(),
				},
				include: [
					{
						model: models.project_images,
						as: "project_images",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},
						required: false,
					},
					{
						model: models.bids,
						as: "bids",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},
						include: [
							{
								model: models.users,
								as: "user",
								attributes: ["email", "user_name"],
								required: false,
							},
						],
						required: false,
					},
					{
						model: models.users,
						as: "creator",
						attributes: ["email", "user_name", "id"],
						required: false,
					},
					{
						model: models.users,
						as: "programmer",
						attributes: ["email", "user_name", "id"],
						required: false,
					},
					{
						model: models.prebid_messages,
						as: "prebid_messages",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},
						include: [
							{
								model: models.users,
								as: "from",
								attributes: ["email", "user_name"],
								required: false,
							},
						],
						required: false,
					},
				],

				attributes: {
					include: [
						[
							db.sequelize.literal(
								`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
							),
							"bids_count",
						],
					],
				},
			});



			if (!project) {
				return R(res, false, "Project not found");
			}


			// let buyer = await models.users.findOne({
			// 	where: {
			// 		id: req.user?.id
			// 	},
			// 	attributes: ["user_name", "email"]
			// })
			let bid: any = await models.bids.findOne({
				where: {
					project_id: project.id,
					user_id: project.programmer_id
				},
			});

			if (!bid) {
				return R(res, false, "Invalid	 Bid");
			}


			var today = new Date();

			let transaction_details = await models.transactions.create({
				amount: (bid?.bid_amount_gbp) / 0.79,
				amount_gbp: bid.bid_amount || 0,

				type: "Escrow Transfer",


				creator_id: req.user?.id,
				buyer_id: req.user?.id,


				provider_id: project.programmer_id,
				reciever_id: project.programmer_id,

				status: "success",
				country_code: 2,
				transaction_time: moment().unix(),

				description: "Paypal",
				user_type: "customer",
				project_id: project.id,

			});


			project.project_status = "4";
			project.project_fund_date_format = today;

			await project.save();




			let supplier = await models.users.findOne({
				where: {
					id: project.programmer_id
				}
			})

			let task_id = 107;

			const api_data_rep: object = {
				"!project_title": project.project_name,
				"!supplier_username": supplier?.user_name,
				"!bid_amount": transaction_details.amount_gbp,
				"!shipping_date": project.bids[0].bid_days,
				"!amount": (transaction_details.amount_gbp) * (100 - 14.9) / 100,
				"!project_url": `${mail.mailbaseurl}project/${project.project_name}/${project.id}`

			}

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}




			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}
			})

			sendMail({ to: supplier?.email, subject, body });

			// notification to supplier

			//console.log("notif -->",notifs);

			let user = await models.users.findOne({
				where: {
					id: project.creator_id
				}
			})

			let task_id_cust = 106;

			const api_data_rep_cus: object = {
				"!project_title": project.project_name,
				"!username": user?.user_name,
				"!bid_amount": transaction_details.amount,
				"!withdraw_url": `${mail.mailbaseurl}auth/sign-in`,
				"!amount": transaction_details.amount_gbp,
				"!supplier_name": supplier?.user_name,
				"!delvry_date": project.bids[0].bid_days
			}

			const mailData_cus = await models.email_templates.findOne({
				where: {
					id: task_id_cust,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData_cus?.mail_body;
			var title = mailData_cus?.title;
			var subject = mailData_cus?.mail_subject;

			(Object.keys(api_data_rep_cus) as (keyof typeof api_data_rep_cus)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep_cus[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep_cus[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep_cus[key])
				}




			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}
			})

			sendMail({ to: user?.email, subject, body });



			return R(res, true, "Payment is done ", { project });





		} catch (error) {
			console.log(error)
			return R(res, false, "Not verified!", { error: error });
		}


	}),






















	invoice_machinist: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		//let machinist_id = pareq.query.machinist_id;

		// if (!project_id) {
		// 	return R(res, false, "please provide a project ID");
		// }

		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
			user_id: req.query.user_id?.toString() || null,
		};





		const machinists = await models.transactions.findAll({
			where: {
				provider_id: req.query.machinist_id?.toString(),
				status: "Completed",

			},
			// attributes: {
			// 	include: [
			// 		[
			// 			db.sequelize.literal(
			// 				`(SELECT COUNT(*) FROM transactions WHERE reciever_id = machinists.reciever_id)`,
			// 			),
			// 			"bids_count",
			// 		],
			// 	],
			// },
			include: [
				{
					model: models.projects,
					as: "project",
					where: {
						id: { [Op.col]: "transactions.project_id" },
					},
					required: false,
				},
				{
					model: models.users,
					as: "creator",
					where: {
						id: { [Op.col]: "transactions.creator_id" },
					},
					required: false,
				},
				{
					model: models.users,
					as: "reciever",
					where: {
						id: { [Op.col]: "transactions.reciever_id" },
					},
					required: false,
				},
				{
					model: models.invoices,
					as: "invoices",
					where: {
						id: { [Op.col]: "transactions.project_id" },
					},
					required: false,
				},

			],
			order: [["id", "DESC"]],
			limit: opt.limit,
			offset: opt.page * opt.limit,

			// attributes: {
			// 	include: [
			// 		[
			// 			db.sequelize.literal(
			// 				`(SELECT COUNT(*) FROM projects WHERE project_id = transactions.project_id)`,
			// 			),
			// 			"projects",
			// 		],
			// 	],
			// },
		})

		let count = machinists.length;

		//console.log("transactions rel to mach-->", machinists);


		if (!machinists) {
			console.log("ended");
			return R(res, false, "No transactions found");
		}

		return R(res, true, "project details", machinists, {
			current_page: opt.page,
			total_count: count,
			total_pages: Math.floor(count / opt.limit),
		});







		// validation
		//console.log("res",res)
		// let data = await Validate(
		// 	res,
		// 	[],
		// 	schema.project.invoice_machinist,
		// 	req.body,
		// 	{},
		// );
		// console.log("add2",data,req.query.machinist_id)
		// const project = await models.projects.findAndCountAll({
		// 	where: {
		// 		id: '1',
		// 	},
		// 	include: [
		// 		{
		// 			model: models.project_images,
		// 			as: "project_images",
		// 			where: {
		// 				project_id: { [Op.col]: "projects.id" },
		// 			},
		// 			required: false,
		// 		},
		// 		{
		// 			model: models.bids,
		// 			as: "bids",
		// 			where: {
		// 				project_id: { [Op.col]: "projects.id" },
		// 			},
		// 			include: [
		// 				{
		// 					model: models.users,
		// 					as: "user",
		// 					attributes: ["email", "user_name"],
		// 					required: false,
		// 				},
		// 				// {
		// 				// 	model: models.messages,
		// 				// 	as: "messages",
		// 				// 	where:{
		// 				// 		project_id: { [Op.col]: "projects.id" },
		// 				// 		[Op.or]: [
		// 				// 			{
		// 				// 				to_id: { [Op.col]: "projects.bids.user_id" },
		// 				// 				from_id: {[Op.col]: "projects.creator_id" },
		// 				// 			},
		// 				// 			{
		// 				// 				to_id: {[Op.col]: "projects.creator_id"},
		// 				// 				from_id: { [Op.col]: "projects.bids.user_id" },
		// 				// 			},
		// 				// 		],
		// 				// 	},
		// 				// 	limit:2,
		// 				// 	required: false,

		// 				// },
		// 			],
		// 			required: false,
		// 		},
		// 		{
		// 			model: models.users,
		// 			as: "creator",
		// 			attributes: ["email", "user_name"],
		// 			required: false,
		// 		},
		// 		{
		// 			model: models.users,
		// 			as: "programmer",
		// 			attributes: ["email", "user_name"],
		// 			required: false,
		// 		},
		// 		{
		// 			model: models.prebid_messages,
		// 			as: "prebid_messages",
		// 			where: {
		// 				project_id: { [Op.col]: "projects.id" },
		// 			},
		// 			include: [
		// 				{
		// 					model: models.users,
		// 					as: "from",
		// 					attributes: ["email", "user_name"],
		// 					required: false,
		// 				},
		// 			],
		// 			required: false,
		// 		},
		// 	],

		// 	attributes: {
		// 		include: [
		// 			[
		// 				db.sequelize.literal(
		// 					`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
		// 				),
		// 				"bids_count",
		// 			],
		// 		],
		// 	},
		// });

		// const projects = await models.projects.findAndCountAll({
		// 	where: {
		// 		id: 1,
		// 	},
		// 	// include: [
		// 	// 	{
		// 	// 		model: models.project_images,
		// 	// 		as: "project_images",
		// 	// 		where: {
		// 	// 			project_id: { [Op.col]: "projects.id" },
		// 	// 		},
		// 	// 		required: false,
		// 	// 	},
		// 	// 	{
		// 	// 		model: models.users,
		// 	// 		as: "creator",
		// 	// 		attributes: ["email", "user_name", "role_id"],
		// 	// 		required: false,
		// 	// 	},
		// 	// ],

		// 	attributes: {
		// 		include: [
		// 			[
		// 				db.sequelize.literal(
		// 					`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
		// 				),
		// 				"bids_count",
		// 			],
		// 		],
		// 	},
		// });
		// return	R(res, true, "Payment is done ", { projects });

		//  let project = await models.transactions.findAll({	where: {
		// 	reciever_id
		// 	: req.query.machinist_id?.toString() ,
		// }});

		// console.log("trans",project)
		// return res.json(project); 

		// let Invoice = await models.transactions.findOne({
		// 	where: {
		// 		reciever_id
		// 		: req.query.machinist_id?.toString() ,
		// 	},
		// 	include: [
		// 		{
		// 			model: models.projects,
		// 			as: "projects",
		// 			where: {
		// 				project_id: { [Op.col]: "transactions.project_id" },
		// 			},
		// 			required: false,
		// 		},
		// 		{
		// 			model: models.users,
		// 			as: "users",
		// 			where: {
		// 				id: { [Op.col]: "transactions.creator_id" },
		// 			},
		// 			include: [
		// 				{
		// 					model: models.users,
		// 					as: "user",
		// 					attributes: ["email", "user_name"],
		// 					required: false,
		// 				},
		// 				// {
		// 				// 	model: models.messages,
		// 				// 	as: "messages",
		// 				// 	where:{
		// 				// 		project_id: { [Op.col]: "projects.id" },
		// 				// 		[Op.or]: [
		// 				// 			{
		// 				// 				to_id: { [Op.col]: "projects.bids.user_id" },
		// 				// 				from_id: {[Op.col]: "projects.creator_id" },
		// 				// 			},
		// 				// 			{
		// 				// 				to_id: {[Op.col]: "projects.creator_id"},
		// 				// 				from_id: { [Op.col]: "projects.bids.user_id" },
		// 				// 			},
		// 				// 		],
		// 				// 	},
		// 				// 	limit:2,
		// 				// 	required: false,

		// 				// },
		// 			],
		// 			required: false,
		// 		},
		// 		// {
		// 		// 	model: models.users,
		// 		// 	as: "creator",
		// 		// 	attributes: ["email", "user_name"],
		// 		// 	required: false,
		// 		// },
		// 		// {
		// 		// 	model: models.users,
		// 		// 	as: "programmer",
		// 		// 	attributes: ["email", "user_name"],
		// 		// 	required: false,
		// 		// },
		// 		// {
		// 		// 	model: models.prebid_messages,
		// 		// 	as: "prebid_messages",
		// 		// 	where: {
		// 		// 		project_id: { [Op.col]: "projects.id" },
		// 		// 	},
		// 		// 	include: [
		// 		// 		{
		// 		// 			model: models.users,
		// 		// 			as: "from",
		// 		// 			attributes: ["email", "user_name"],
		// 		// 			required: false,
		// 		// 		},
		// 		// 	],
		// 		// 	required: false,
		// 		// },
		// 	],

		// 	attributes: {
		// 		include: [
		// 			[
		// 				db.sequelize.literal(
		// 					`(SELECT COUNT(*) FROM transactions WHERE reciever_id = transactions.id)`,
		// 				),
		// 				"bids_count",
		// 			],
		// 		],
		// 	},
		// });

		// console.log("add3",Invoice)

		// if (!Invoice) {
		// 	return R(res, false, "Invoice not found");
		// }

		//console.log("add4")

		// let transaction_details = await models.transactions.findOne( {
		// 	where: {
		// 		project_id: data.project_id,
		// 	},
		// });
		// if (!transaction_details) {
		// 	return R(res, false, "Invalid  transaction");
		// }
		// // let old_amount = transaction_details.amount_gbp;
		// // if (old_amount != data.amount) {
		// // 	return R(res, false, "Invalid  amount");
		// // }
		// console.log("add5")

		// await transaction_details.update({
		// 	amount: data.amount,
		// 	amount_gbp: transaction_details.amount_gbp,
		// 	type: "DEPOSIT FUND",

		// 	status: "SUCCESS",
		// 	description: "PAYMENT IS DONE ",
		// });

		// project.project_status = "1";
		// console.log("add6")

		// await project.save();
		//	return	R(res, true, "Payment is done ", { project });
	}),

	review_machinist: asyncWrapper(
		async (req: UserAuthRequest, res: Response) => {
			// validation
			let data = await Validate(
				res,
				[],
				schema.project.review_machinist,
				req.body,
				{},
			);

			//console.log(" review data ------////--> ", data);

			let project_rating = (data.provider_rate1 + data.provider_rate2 + data.provider_rate3 + data.provider_rate4) / 4;

			let project = await models.projects.findByPk(data.project_id);

			if (!project || !project.programmer_id) {
				return R(res, false, "Project not found");
			}
			let currDate = new Date();

			console.log("The rating submitted is:-", project_rating);

			let review = await models.reviews.create({
				rating: project_rating,
				comments: data.comments,
				project_id: data.project_id,
				buyer_id: req.user?.id || 0,
				provider_id: project.programmer_id,
				provider_rate1: data.provider_rate1,
				provider_rate2: data.provider_rate2,
				provider_rate3: data.provider_rate3,
				provider_rate4: data.provider_rate4,
				review_post_date: currDate,
				country_code: 2,
			});

			//console.log("review created------>", review);

			project.project_status = "5";

			await project.save();



			////////////////////////////////////////Send mail Functionality//////////////////////

			let cust_name = await models.users.findOne({
				where: {
					id: project.creator_id
				}
			})

			const api_data_rep: object = {
				"!customer_name": cust_name?.name,
				"!project_name": project.project_name
			}



			// send mail to supplier

			const supplier = await models.users.findOne({
				where: {
					id: project.programmer_id
				}
			})

			let task_id_sup = 109;

			const api_data_rep_sup: object = {
				"!username": supplier?.user_name,
				"!public_profile_link": `${mail.mailbaseurl}account/public-profile/${supplier?.id}`

			}

			const mailDataSupp = await models.email_templates.findOne({
				where: {
					id: task_id_sup,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body_sup = mailDataSupp?.mail_body;
			var title_sup = mailDataSupp?.title;
			var subject_sup = mailDataSupp?.mail_subject;

			(Object.keys(api_data_rep_sup) as (keyof typeof api_data_rep_sup)[]).forEach(key => {
				if (body_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					body_sup = body_sup.replace(re, api_data_rep_sup[key])
				}

				if (title_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					title_sup = title_sup.replace(re, api_data_rep_sup[key])
				}

				if (subject_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject_sup = subject_sup.replace(re, api_data_rep_sup[key])
				}




			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body_sup?.includes(key)) {

					var re = new RegExp(key, 'g');

					body_sup = body_sup.replace(re, site_mail_data[key])
				}

				if (title_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					title_sup = title_sup.replace(re, site_mail_data[key])
				}

				if (subject_sup?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject_sup = subject_sup.replace(re, site_mail_data[key])
				}
			})

			data["customer_id"] = project?.creator_id;
			data["supplier_id"] = project?.programmer_id;
			data["email_type"] = title_sup
			data["email_subject"] = subject_sup
			data["email_body"] = body_sup
			const date = new Date();
			data["notif_date"] = date
			data["message_status"] = "R"

			//console.log("notif data-->", data);


			let notifs = await models.notif_email_list.create(data)

			sendMail({ to: supplier?.email, subject: subject_sup, body: body_sup });

			return R(res, true, "review submitted ", { project });
		},
	),


	list_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.list_msgs, req.query, {});

		let project = await models.projects.findByPk(data.project_id, {
			attributes: ["id", "programmer_id", "project_name"],
		});

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		let to = await models.users.findByPk(
			data.to_id == req.user?.id ? data.from_id : data.to_id,
			{
				attributes: ["user_name"],
			},
		);

		let messages = await models.messages.findAll({
			where: {
				project_id: data.project_id,
				[Op.or]: [
					{
						to_id: data.to_id,
						from_id: data.from_id,
					},
					{
						to_id: data.from_id,
						from_id: data.to_id,
					},
				],
			},
			order: [["created", "DESC"]],
		});

		return R(res, true, "Messages list", messages, { to, project });
	}),

	my_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		let user = await models.users.findByPk(req.user?.id);

		if (!user) {
			return R(res, false, "Invalid user");
		}


		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
			user_id: req.query.user_id?.toString() || null,
		};


		const limit = opt.limit;
		const offset = opt.page * opt.limit;

		const latestMessages = await db.sequelize.query('SELECT messages.*, projects.project_name, users.user_name FROM messages LEFT JOIN projects ON messages.project_id = projects.id LEFT JOIN users ON messages.from_id = users.id WHERE messages.id IN ( SELECT MAX(id) FROM messages GROUP BY project_id ) AND (messages.from_id = :user_id OR messages.to_id = :user_id) ORDER BY messages.created DESC LIMIT :limit OFFSET :offset', { model: models.messages, replacements: { limit, offset, user_id: req.user?.id } })

		const latestMessages2 = await db.sequelize.query('SELECT messages.*, projects.project_name, users.user_name FROM messages LEFT JOIN projects ON messages.project_id = projects.id LEFT JOIN users ON messages.from_id = users.id WHERE messages.id IN ( SELECT MAX(id) FROM messages GROUP BY project_id ) AND (messages.from_id = :user_id OR messages.to_id = :user_id) ORDER BY messages.created DESC', { model: models.messages, replacements: { user_id: req.user?.id } })


		console.log("latest are:- ", latestMessages)
		return R(res, true, "Messages list", latestMessages, {
			current_page: opt.page,
			total_count: latestMessages2.length,
			total_pages: Math.floor(latestMessages2.length / opt.limit),
		});


	}),
	send_msg: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.send_msg, req.body, {});

		let project = await models.projects.findByPk(data.project_id);

		let usr = await models.users.findOne({
			where: {
				id: req.user?.id
			}
		})
		console.log("supplier name---->", usr);


		if (!project) {
			return R(res, false, "Invalid Project");
		}


		//let file = null;

		// file upload


		if (req.files?.file) {
			let file = await uploadsendmsgFile(req, res);
			let concatenatedData = file.join(',');
			data["attach_file"] = concatenatedData;
		}

		data["created"] = moment().unix();
		data["notification_status"] = "N";
		data["from_id"] = req.user?.id;

		if (usr?.role_id == 2) {
			data["to_id"] = project.creator_id;
		} else {
			data["to_id"] = project.programmer_id;
		}
		//data["reply_for"] = 0;

		if (req.files?.file2 != undefined) {
			let file2 = await uploadMachiningFile(req, res);
			//console.log("name after mod:- ", file2)
			let concatenatedData = file2.join(',');

			data["machine_parts_image"] = concatenatedData;
		}



		if (usr?.role_id == 1) {
			data["buyer_message_status"] = "R"
			data["programmer_message_status"] = "U"
		} else {
			data["buyer_message_status"] = "U"
			data["programmer_message_status"] = "R"
		}











		let message = await models.messages.create(data);


		let proj_img = await models.project_images.findOne({
			where: {
				project_id: project?.id
			}
		})


		if (req.files?.file2 != undefined && !proj_img) {
			let file2 = await uploadMachiningFile(req, res);
			//console.log("name after mod:- ", file2)
			let concatenatedData = file2.join(',');
			let data2: any = {
				project_id: project?.id,
				project_name: project?.project_name,
				project_post_date: project.project_post_date,
				cust_id: project?.creator_id,
				sup_id: project.programmer_id,
				attach_file: concatenatedData,
				upload_date: new Date(),
				approved: 1,
				country_code: 0,
				adminApprove: 0
			}
			let new_proj = await models.project_images.create(data2);
			//return R(res, true, "Confirmation sent", new_proj)
		} else if (req.files?.file2 != undefined && proj_img) {

			let file2 = await uploadMachiningFile(req, res);
			//console.log("file2 is", file2)
			let concatenatedData = file2.join(',');


			proj_img.update({ attach_file: Sequelize.literal(`concat(attach_file, ',', '${concatenatedData}')`) })
			//return R(res, true, "Confirmation sent", proj_img)
		}



		///////////////////////////Mail send functionality//////////////////////////////



		let mail_to = await models.users.findOne({
			where: {
				id: message.to_id
			}
		})

		const api_data_rep: object = {
			"!project_name": project.project_name,
			"!message": message.message,
			"!message_url": `http://35.179.7.135/machining/msg/${project?.id}/${message.from_id}/${message.to_id}`,
			"!supplier": usr?.user_name

		}

		let task_id = 96;

		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en"
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});

		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;

		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, api_data_rep[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, api_data_rep[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, api_data_rep[key])
			}

		});


		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


			if (body?.includes(key)) {

				var re = new RegExp(key, 'g');

				body = body.replace(re, site_mail_data[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, site_mail_data[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, site_mail_data[key])
			}

		})

		if (usr?.role_id == 1) {
			const cdate = new Date()
			let notifdata: any = {
				email_type: "Private message",
				email_subject: "Message sent from client",
				supplier_id: data.to_id,
				email_body: "Client sent a message to you",
				notif_date: cdate,
				message_status: "R",
				project_id: project?.id,
				customer_id: req.user?.id
			}


			let notifs = await models.notif_email_list.create(notifdata)
			//console.log(notifs);

		}
		sendMail({ to: mail_to?.email, subject, body });
		return R(res, true, "Message Sent", message);
	}),
	list_bid_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			[],
			schema.project.list_bid_msgs,
			req.query,
			{},
		);

		let project = await models.projects.findByPk(data.project_id, {
			attributes: ["id", "programmer_id"],
		});

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		let messages = await models.message_dialog.findAll({
			where: {
				project_id: data.project_id,
				[Op.or]: [
					{
						send_to: data.to_id,
						send_from: data.from_id,
					},
					{
						send_to: data.from_id,
						send_from: data.to_id,
					},
				],
			},
			order: [["datetime", "DESC"]],
		});

		return R(res, true, "Messages list", messages);
	}),
	send_bid_msg: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			[],
			schema.project.send_bid_msg,
			req.body,
			{},
		);

		let project = await models.projects.findByPk(data.project_id);

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		// file upload



		if (req.files?.file) {
			let file = await uploadFile(req, res);
			let concatenatedData = file.join(',');
			data["attachment"] = concatenatedData;
		}

		data["send_from"] = req.user?.id;

		let message = await models.message_dialog.create(data);


		///////////////////////////Mail send functionality//////////////////////////////


		// let custdetails = await models.users.findOne({
		// 	where: {
		// 		id: project.creator_id
		// 	}
		// })

		let macdetails = await models.users.findOne({
			where: {
				id: message.send_to
			}
		})

		let macdetails2 = await models.users.findOne({
			where: {
				id: message.send_from
			}
		})
		if (macdetails?.role_id == 1) {
			const api_data_rep: object = {
				"!project_name": project.project_name,
				"!supplier_name ": macdetails2?.user_name,
				"!message": message.msg_box,
				"!project_url": `${mail.mailbaseurl}machining/${project.project_name.split(" ").join("-")}-${project?.id}`,
			}

			let task_id = 87;

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}

			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}

			})

			console.log("macdetails----------->", macdetails?.email)
			sendMail({ to: macdetails?.email, subject, body });
		}
		else {


			const api_data_rep: object = {
				"!project_name": project.project_name,
				"!message": message.msg_box,
				"!project_url": `${mail.mailbaseurl}machining/${project.project_name.split(" ").join("-")}-${project?.id}`,

			}

			let task_id = 89;

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}

			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}

			})

			console.log("macdetails----------->", macdetails?.email)
			sendMail({ to: macdetails?.email, subject, body });
		}
		return R(res, true, "Message Sent", message);
	}),

	get_my_temp: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_id"],
			schema.project.get_my_temp,
			req.query,
			{},
		);

		let temp_project = await models.projects_temp.findOne({
			where: {
				id: data.project_id,
				creator_id: {
					[Op.eq]: 0,
				},
			},
		});

		if (!temp_project) {
			return R(res, false, "no data available to post");
		}

		return R(res, true, "Temp Project Found", temp_project);
	}),
	get_temp: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_ids"],
			schema.project.get_temp,
			req.body,
			{},
		);

		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		let temp_projects = await models.projects_temp.findAll({
			where: {
				id: {
					[Op.in]: data.project_ids,
				},
				creator_id: {
					[Op.eq]: 0,
				},
			},
		});

		if (!temp_projects.length) {
			return R(res, false, "no data available to post");
		}

		for (let p of temp_projects) {
			let project: any = p.toJSON();
			let images: any = project.images;

			delete project.images;
			delete project.id;
			project.creator_id = user?.id;
			project.show_release = 0
			console.log("before create projects are:-", project)
			console.log("imagesssss111-----", typeof images)

			let entry = await models.projects.create(project);


			if (images && images?.length) {
				let abc = JSON.parse(images) as string[];
				console.log("typeof abc is", typeof abc);
				let concatenatedData = abc.join(',');
				console.log("Concatenated data is", concatenatedData)

				await entry.update({ attachment_name: concatenatedData })

			}
			console.log("project created through temp---->", entry);
		}

		const api_data_rep: object = {
			"!username": user.user_name,
		}

		let task_id = 85;

		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en"
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});

		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;

		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, api_data_rep[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, api_data_rep[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, api_data_rep[key])
			}

		});


		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


			if (body?.includes(key)) {

				var re = new RegExp(key, 'g');

				body = body.replace(re, site_mail_data[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, site_mail_data[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, site_mail_data[key])
			}

		})
		sendMail({ to: user.email, subject, body });

		return R(res, true, "Project Added Successfully", {});
	}),

	user_reviews: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let user = await models.users.findByPk(req.user?.id, {
			attributes: ["id", "role_id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		if (user?.role_id == 1) {
			var user_reviews = await models.reviews.findAll({

				where: {
					buyer_id: user.id
				},

				include: [
					{
						model: models.projects,
						as: "project",
						where: {
							id: { [Op.col]: "project_id" },
						},
						attributes: ["project_name"],
						required: false,
					},
					{
						model: models.users,
						as: "provider",
						where: {
							id: { [Op.col]: "provider_id" },
						},
						attributes: ["user_name"],
						required: false,
					}
				],
				attributes: ['rating', 'project_id', 'buyer_id', 'provider_id'],
			})

			//console.log(user_reviews);


			user_reviews = user_reviews.reverse()

			return R(res, true, "User reviews", user_reviews);

		}


		var provider_reviews = await models.reviews.findAll({

			where: {
				provider_id: user.id
			},

			include: [
				{
					model: models.projects,
					as: "project",
					where: {
						id: { [Op.col]: "project_id" },
					},
					attributes: ["project_name"],
					required: false,
				},
				{
					model: models.users,
					as: "provider",
					where: {
						id: { [Op.col]: "provider_id" },
					},
					attributes: ["user_name"],
					required: false,
				}
			],
			attributes: ['rating', 'project_id', 'buyer_id', 'provider_id'],
		})

		//console.log(provider_reviews);


		user_reviews = provider_reviews.reverse()

		return R(res, true, "User reviews", provider_reviews);





	}),
	customer_reviews: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		//console.log(req)
		let user = await models.users.findByPk(req.query.machinist_id?.toString(), {
			attributes: ["id", "role_id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		if (user?.role_id == 1) {
			var user_reviews = await models.reviews.findAll({

				where: {
					provider_id: user.id
				},

				include: [
					{
						model: models.projects,
						as: "project",
						where: {
							id: { [Op.col]: "project_id" },
						},
						attributes: ["project_name"],
						required: false,
					},
					{
						model: models.users,
						as: "provider",
						where: {
							id: { [Op.col]: "provider_id" },
						},
						attributes: ["user_name"],
						required: false,
					}
				],
				attributes: ['rating', 'project_id', 'buyer_id', 'provider_id'],
			})

			//console.log(user_reviews);


			user_reviews = user_reviews.reverse()

			return R(res, true, "User reviews", user_reviews);

		}


		var provider_reviews = await models.reviews.findAll({

			where: {
				provider_id: user.id
			},

			include: [
				{
					model: models.projects,
					as: "project",
					where: {
						id: { [Op.col]: "project_id" },
					},
					attributes: ["project_name"],
					required: false,
				},
				{
					model: models.users,
					as: "provider",
					where: {
						id: { [Op.col]: "provider_id" },
					},
					attributes: ["user_name"],
					required: false,
				}
			],
			attributes: ['rating', 'project_id', 'buyer_id', 'provider_id'],
		})

		//console.log(provider_reviews);


		user_reviews = provider_reviews.reverse()

		return R(res, true, "User reviews", provider_reviews);





	}),

	my_project: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//pagination options
		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
			user_id: req.query.user_id?.toString() || null,
		};

		let user = await models.users.findByPk(req.user?.id, {
			attributes: ["id", "role_id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		const projects = await models.projects.findAndCountAll({
			where: {
				creator_id: user.id,
			},
			include: [
				{
					model: models.project_images,
					as: "project_images",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					required: false,
				},
				{
					model: models.users,
					as: "creator",
					attributes: ["email", "user_name"],
					required: false,
				},
			],
			attributes: [
				"id",
				"project_name",
				"project_image",
				"created",
				"enddate",
				"description",
				"project_status",
				"visibility",
				"project_post_date",
				"post_for",
				"createdAt",
				[
					db.sequelize.literal(
						`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
					),
					"bids_count",
				],
			],
			limit: opt.limit,
			offset: opt.page * opt.limit,
			order: [["createdAt", "DESC"]],
		});

		let list = projects.rows;
		let count = projects.count;

		return R(res, true, "project list", list, {
			current_page: opt.page,
			total_count: count,
			total_pages: Math.floor(count / opt.limit),
		});

	}),


	review_projects: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
			//user_id: req.query.user_id?.toString() || null,
			search: req.query.search?.toString() || ""
		};

		console.log("srarch key ----------------->>>>>", opt.search);



		if (opt.search == "") {

			const projects = await models.projects.findAndCountAll({
				where: {
					project_status: 5,
					country_code: 2
				},
				include: [
					{
						model: models.reviews,
						as: "reviews",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},

					},
					{
						model: models.project_images,
						as: "project_images",
						where: {
							project_id: { [Op.col]: "projects.id" },
						},
						required: false,
					},
					{
						model: models.users,
						as: "creator",
						attributes: ["email", "user_name"],
						required: false,
					},
					{
						model: models.transactions,
						as: "transactions",
						where: {

							project_id: { [Op.col]: "projects.id" },

						},
						attributes: ["amount", "amount_gbp"],


					}



				],
				limit: opt.limit,
				offset: opt.page * opt.limit,
				order: [["project_post_format_date", "DESC"]],

			})

			let list = projects.rows;
			let count = projects.count;

			//console.log("no search result ---------->>>>", list);



			return R(res, true, "Reviewed projects", list, {
				current_page: opt.page,
				total_count: count,
				total_pages: Math.floor(count / opt.limit),
			});

		}
		else {

			//console.log("enytrut");

			opt.search = (opt.search).trim()


			const searchArray = (opt.search).split(" ");

			let searchResult: any[] = [];

			let finalResult: any[] = [];


			for (let x in searchArray) {

				const el = searchArray[x];

				console.log("el search ------>>>>>>", el);


				const projects = await models.projects.findAll({
					where: {
						project_status: 5,
						country_code: 2,
						project_name: {
							[Op.substring]: el
						},

					},
					include: [
						{
							model: models.reviews,
							as: "reviews",
							where: {
								project_id: { [Op.col]: "projects.id" },
							},

						},
						{
							model: models.project_images,
							as: "project_images",
							where: {
								project_id: { [Op.col]: "projects.id" },
							},
							required: false,
						},
						{
							model: models.users,
							as: "creator",
							attributes: ["email", "user_name"],
							required: false,
						},
						{
							model: models.transactions,
							as: "transactions",
							where: {

								project_id: { [Op.col]: "projects.id" },

							},
							attributes: ["amount", "amount_gbp"],


						}



					],
					limit: opt.limit,
					offset: opt.page * opt.limit,
					order: [["project_post_format_date", "DESC"]],
				})

				//console.log("result projects", projects.length);

				if (projects.length > 0)
					searchResult.push(projects)

			}

			for (let x in searchResult) {
				for (let y in searchResult[x]) {
					finalResult.push(searchResult[x][y]);
				}
			}



			let count = finalResult.length;

			//console.log("search result type ---->>", finalResult);


			//console.log("final results -------------->>>", finalResult);


			return R(res, true, "Reviewed projects", finalResult, {
				current_page: opt.page,
				total_count: count,
				total_pages: Math.floor(count / opt.limit),
			});








		}




	}),

	image_list: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log("going for plist")

		const projects = await models.projects.findAll({
			include: [
				{
					model: models.project_images,
					as: "project_images",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					required: false,
				},
				{
					model: models.users,
					as: "creator",
					attributes: ["email", "user_name", "role_id"],
					required: false,
				},
			],
			attributes: [
				"id",
				"project_name",
				"project_image",
				"created",
				"enddate",
				"description",
				"project_status",
				"visibility",
				"project_post_date",
				"post_for",
				"programmer_id",
				"pro_job",
				"createdAt",
				"show_release",
				[
					db.sequelize.literal(
						`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
					),
					"bids_count",
				],
			],

		});
		console.log("projects--", projects)



		return R(res, true, "project all list", projects, {

		});
	}),

	allreviews: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),

		};
		let reviews = await models.reviews.findAndCountAll({
			include: [
				{
					model: models.users,
					as: "provider",
					where: {
						id: { [Op.col]: "provider_id" },
					},
					attributes: ["user_name", "name", "surname"],
					required: false,
				},
				{
					model: models.projects,
					as: "project",
					where: {
						id: { [Op.col]: "project_id" },
						country_code: 2,
					}
				},

				{
					model: models.users,
					as: "buyer",
					where: {
						id: { [Op.col]: "buyer_id" },
					},
					attributes: ["user_name", "name", "surname"],
					required: false,
				},


			],
			order: [["review_post_date", "DESC"]],
			limit: opt.limit,
			offset: opt.page * opt.limit,
		});
		const obj: any = {
			hrsdiff: ""
		}
		let list = reviews.rows;
		let count = reviews.count;

		//console.log("reviews from backend:-", reviews, obj)
		return R(res, true, "All reviews", list, {
			current_page: opt.page,
			total_count: count,
			total_pages: Math.floor(count / opt.limit),
		});
	}),



	all_lists: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log("going for plist")

		let projects = await models.project_images.findAll({
			where: {
				adminApprove: 1,
				approved: 2,
				country_code: 2,
			},
			order: [["project_post_date", "DESC"]],
			limit: 10
		})

		//let arr: string = [];

		let arr: any = []

		for (let i = 0; i < projects.length; i++) {
			let obj = {}
			let attachment = projects[i].attach_file
			let project_name = projects[i].project_name
			let created = projects[i].upload_date
			let new_attach: any = attachment.split(",")

			let apr = await models.admin_apprv_imgs.findOne({
				where: {
					id: "2"
				}
			})

			for (let i = 0; i < new_attach.length; i++) {
				if (apr?.images.includes(new_attach[i])) {
					obj = {
						a: new_attach[i],
						b: project_name,
						c: created
					}
					arr.push(obj)
					break
				}
			}


			// new_attach.map((m: any) => {
			// 	obj = {
			// 		a: m,
			// 		b: project_name
			// 	}
			// 	arr.push(obj)
			// })
			//arr = [...arr, new_attach]
		}

		console.log("coming from all-list:-", arr)

		return R(res, true, "project all list", projects, {
		});
	}),

	project_gallery: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		//console.log("going for plist")

		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
		};

		let projects: any = await models.project_images.findAll({
			where: {
				adminApprove: 1,
				approved: 2
			},
			order: [["project_post_date", "DESC"]],

		})

		let apr = await models.admin_apprv_imgs.findOne({
			where: {
				id: "2"
			}
		})

		//let arr: string = [];

		let arr: any = []
		let cnt: number = 0;

		for (let i = 0; i < projects.length; i++) {
			let obj = {}

			let attachment = projects[i].attach_file
			let project_name = projects[i].project_name
			let id = projects[i].project_id
			let date = projects[i].upload_date
			let new_attach: any = attachment.split(",")
			new_attach.map((m: any) => {
				if (apr?.images.includes(m)) {
					obj = {
						a: m,
						b: project_name,
						c: id,
						d: date
					}
					arr.push(obj)

				}
			})



			//arr = [...arr, new_attach]
		}

		console.log("new attach:-", arr)

		//let list = projects.rows;
		let count = projects.length;

		return R(res, true, "project all list", arr);
	}),


	update_release_payment: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let data = req.body.id

		console.log("project id is :-  ", data)

		let project = await models.projects.findOne({
			where: {
				id: req.body.id
			}
		})

		project?.update({ show_release: 1 })


	}),

	notifs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		const user = await models.users.findOne({
			where: {
				id: req.user?.id
			}
		})
		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
			user_id: req.query.user_id?.toString() || null,
		};

		if (user?.role_id == 1) {
			var notifs = await models.notif_email_list.findAndCountAll({
				where: {
					customer_id: user?.id

				},
				include: [
					{
						model: models.users,
						as: "customer",
						attributes: ["email", "user_name"],
						required: false,
					}
				],
				order: [["notif_date", "DESC"]],
				limit: opt.limit,
				offset: opt.page * opt.limit,

			})

			let list = notifs.rows;

			let count = notifs.count;
			return R(res, true, "notifs list", list, {
				current_page: opt.page,
				total_count: count,
				total_pages: Math.floor(count / opt.limit),
			})

		}
		else if (user?.role_id == 2) {
			var notifs = await models.notif_email_list.findAndCountAll({
				where: {
					supplier_id: user?.id

				},
				include: [
					{
						model: models.users,
						as: "customer",
						attributes: ["email", "user_name"],
						required: false,
					}
				],
				order: [["notif_date", "DESC"]],
				limit: opt.limit,
				offset: opt.page * opt.limit,
			})

			let list = notifs.rows;
			let count = notifs.count;

			return R(res, true, "notifs list", list, {
				current_page: opt.page,
				total_count: count,
				total_pages: Math.floor(count / opt.limit),
			})

		}


		return R(res, false, "Invalid user")


	}),


	machinist_confirmation_message: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let data = await Validate(res, [], schema.project.send_confirm, req.body, {});

		//let data = req.body
		console.log("Confirmation data", req.body)

		data.from_id = req.body.from_id;
		data.message = req.body.message;
		data.project_id = req.body.project_id;
		data.created = moment().unix();
		data.to_id = req.body.to_id;


		data["buyer_message_status"] = "U";
		data["programmer_message_status"] = "R";

		console.log("data before api call: -", data)
		let msg = await models.messages.create(data)

		let projects = await models.projects.findOne({
			where: {
				id: req.body.project_id
			}
		})

		projects?.update({ expedition_day: req.body.date })

		let step = await models.steps_completed_by_supplier.findOne({
			where: {
				project_id: req.body.project_id
			}
		})

		if (!step) {

			let step_data: any = {
				project_id: req.body.project_id,
				step1: 1,
				step2: 0,
				step3: 0
			}

			console.log("step data:- ", step_data)
			let steps = await models.steps_completed_by_supplier.create(step_data)
			console.log("steps completed after:-", steps)
		} else {
			step?.update({ step1: 1 })
		}

		// console.log("msg", msg)

		let mail_to = await models.users.findOne({
			where: {
				id: msg?.to_id,
			}
		})
		const api_data_rep: object = {
			"!content": `${msg.message.replace(/\n/g, '<br>')}`,
		};


		let task_id = 112;

		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en"
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});

		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;

		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, api_data_rep[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, api_data_rep[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, api_data_rep[key])
			}

		});


		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


			if (body?.includes(key)) {

				var re = new RegExp(key, 'g');

				body = body.replace(re, site_mail_data[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, site_mail_data[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, site_mail_data[key])
			}

		})

		console.log("macdetails----------->", mail_to?.email)
		//body = body?.replace(/\n/g, '<br>');
		sendMail({ to: mail_to?.email, subject, body });
		return R(res, true, "Confirmation sent", msg)
	}),

	shipping_message_send: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let data = await Validate(res, [], schema.project.send_shipping, req.body, {});

		//let data = req.body
		console.log("Confirmation data", req.body)

		if (req.files) {
			let file = await shippingmachiningfile(req, res);
			let concatenatedData = file.join(',');

			console.log("Machined parts image files are:- ", file)

			data.from_id = req.body.from_id;
			data.message = req.body.message;
			data.project_id = req.body.project_id;
			data.created = moment().unix();
			data.to_id = req.body.to_id;

			data["buyer_message_status"] = "U";
			data["programmer_message_status"] = "R";
			data["machine_parts_image"] = concatenatedData;

			console.log("data before api call: -", data)

			let projects = await models.projects.findOne({
				where: {
					id: data.project_id
				}
			})
			projects?.update({ track_number: req.body.tracking_no, expedition_day2: req.body.date })
			let msg = await models.messages.create(data)

			let step = await models.steps_completed_by_supplier.findOne({
				where: {
					project_id: req.body.project_id
				}
			})

			if (!step) {
				let step_data: any = {
					project_id: req.body.project_id,
					step1: 0,
					step2: 1,
					step3: 0
				}

				console.log("step data:- ", step_data)
				let steps = await models.steps_completed_by_supplier.create(step_data)
				console.log("steps completed after:-", steps)
			} else {
				step?.update({ step2: 1 })
			}

			let project_image = await models.project_images.findOne({
				where: {
					project_id: projects?.id
				}
			})

			if (!project_image) {

				const date = new Date();

				let day = date.getDate();
				let month = date.getMonth() + 1;
				let year = date.getFullYear();

				// This arrangement can be altered based on how we want the date's format to appear.
				let currentDate = `${year}-${month}-${day}`;

				let concatenatedData = file.join(',');

				let proj_img: any = {
					project_id: req.body.project_id,
					project_name: projects?.project_name,
					project_post_date: projects?.project_post_date,
					cust_id: projects?.creator_id,
					attach_file: concatenatedData,
					upload_date: currentDate,
					sup_id: 0,
					approved: 1,
					country_code: 0,
					adminApprove: 0
				}

				let project_img = await models.project_images.create(proj_img)

				console.log("project img table data:-", project_img)
			} else {
				let last_img = project_image?.attach_file
				let a = ","
				let concatenatedData = file.join(',');
				let b = last_img.concat(a)
				let resp = b.concat(concatenatedData)
				project_image.update({ attach_file: resp })
			}


			console.log("msg", msg)
			return R(res, true, "Confirmation sent", msg)
		} else {
			//let file = await uploadFile(req, res);

			//console.log("Machined parts image files are:- ", file)

			data.from_id = req.body.from_id;
			data.message = req.body.message;
			data.project_id = req.body.project_id;
			data.created = moment().unix();
			data.to_id = req.body.to_id;

			data.buyer_message_status = "U";
			data.programmer_message_status = "R";

			console.log("data before api call: -", data)

			let projects = await models.projects.findOne({
				where: {
					id: data.project_id
				}
			})
			projects?.update({ track_number: req.body.tracking_no, expedition_day2: req.body.date })
			let msg = await models.messages.create(data)

			let step = await models.steps_completed_by_supplier.findOne({
				where: {
					project_id: req.body.project_id
				}
			})

			if (!step) {
				let step_data: any = {
					project_id: req.body.project_id,
					step1: 0,
					step2: 1,
					step3: 0
				}

				console.log("step data:- ", step_data)
				let steps = await models.steps_completed_by_supplier.create(step_data)
				console.log("steps completed after:-", steps)
			} else {
				step?.update({ step2: 1 })
			}


			console.log("msg", msg)

			let mail_to = await models.users.findOne({
				where: {
					id: msg?.to_id,
				}
			})
			const api_data_rep: object = {
				"!content": `${msg.message.replace(/\n/g, '<br>')}`,
			};


			let task_id = 113;

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en"
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
				if (body?.includes(key)) {
					var re = new RegExp(key, 'g');
					body = body.replace(re, api_data_rep[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, api_data_rep[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, api_data_rep[key])
				}

			});


			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


				if (body?.includes(key)) {

					var re = new RegExp(key, 'g');

					body = body.replace(re, site_mail_data[key])
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, 'g');
					title = title.replace(re, site_mail_data[key])
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, 'g');
					subject = subject.replace(re, site_mail_data[key])
				}

			})

			console.log("macdetails----------->", mail_to?.email)
			sendMail({ to: mail_to?.email, subject, body });
			return R(res, true, "Confirmation sent", msg)
		}
	}),
	steps_completed_supplier: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log("steps:-", req.query.id)
		let project_id = req.query.id;
		let steps = await models.steps_completed_by_supplier.findOne({
			where: {
				project_id: project_id?.toString()
			}
		})

		console.log(steps)

		return R(res, true, "All steps", steps)

	}),

	request_release_funds: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log(req.body)
		let step = await models.steps_completed_by_supplier.findOne({
			where: {
				project_id: req.body.project_id
			}
		})

		if (!step) {
			let step_data: any = {
				project_id: req.body.project_id,
				step1: 0,
				step2: 0,
				step3: 1
			}

			console.log("step data:- ", step_data)
			let steps = await models.steps_completed_by_supplier.create(step_data)
			console.log("steps completed after:-", steps)
		} else {
			step?.update({ step3: 1 })
		}


		////////////////////////////////////////Send mail Functionality//////////////////////

		let proj = await models.projects.findOne({
			where: {
				id: req.body.project_id
			}
		})

		let cust_name = await models.users.findOne({
			where: {
				id: proj?.creator_id
			}
		})

		let supplier = await models.users.findOne({
			where: {
				id: proj?.programmer_id
			}
		})

		let mail_to = await models.users.findOne({
			where: {
				id: proj?.creator_id
			}
		})
		const api_data_rep: object = {
			"!user_name": `${supplier?.user_name}`,
			"!project_title": `${proj?.project_name}`
		};
		let task_id = 114;

		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en"
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});

		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;

		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(key => {
			if (body?.includes(key)) {
				var re = new RegExp(key, 'g');
				body = body.replace(re, api_data_rep[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, api_data_rep[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, api_data_rep[key])
			}

		});


		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(key => {


			if (body?.includes(key)) {

				var re = new RegExp(key, 'g');

				body = body.replace(re, site_mail_data[key])
			}

			if (title?.includes(key)) {
				var re = new RegExp(key, 'g');
				title = title.replace(re, site_mail_data[key])
			}

			if (subject?.includes(key)) {
				var re = new RegExp(key, 'g');
				subject = subject.replace(re, site_mail_data[key])
			}

		})

		console.log("macdetails----------->", mail_to?.email)
		sendMail({ to: mail_to?.email, subject, body });

		return R(res, true, "Confirmation sent", step)
	}),

	project_review: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		const review = await models.reviews.findOne({
			where: {
				project_id: Number(req.query.id)
			}
		})

		return R(res, true, `project ${req.query.id}`, review)

	}),


	update_read_my_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let data = req.body
		console.log("read my msgs log", data)

		if (data?.role_id == 1) {

			let restmessages = await models.messages.findAll({
				where: {
					project_id: data?.project_id
				}
			})

			if (!restmessages) {
				return
			} else {
				for (let i = 0; i < restmessages.length; i++) {
					let msssg = await models.messages.findOne({
						where: {
							id: restmessages[i].id
						}
					})
					msssg?.update({ buyer_message_status: "R" })
				}
			}
		} else {

			let restmessages = await models.messages.findAll({
				where: {
					project_id: data?.project_id
				}
			})

			if (!restmessages) {
				return
			} else {
				for (let i = 0; i < restmessages.length; i++) {
					let msssg = await models.messages.findOne({
						where: {
							id: restmessages[i].id
						}
					})
					msssg?.update({ programmer_message_status: "R" })
				}
			}
		}

		return R(res, true, "Got message")

	}),


	inbox_count: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		console.log(req.query.role_id)
		console.log("role id is: -", req.user?.role_id)
		if (req.query.role_id == "1") {
			let count = await models.messages.findAndCountAll({
				where: {
					to_id: req.query.id?.toString(),
					buyer_message_status: "U"
				}
			})
			console.log("The count inbox is : -", count.count)

			return R(res, true, "inbox count", count.count)
		} else {
			let count = await models.messages.findAndCountAll({
				where: {
					to_id: req.query.id?.toString(),
					programmer_message_status: "U"
				}
			})
			console.log("The count inbox is : -", count.count)
			return R(res, true, "inbox count", count.count)
		}

	}),


	update_unread_my_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let data = req.body.role_id
		console.log("Update msg data -", req.body.role_id)

		if (data == 1) {
			let message = await models.messages.findOne({
				where: {
					id: req.body.id
				}
			});
			message?.update({ buyer_message_status: "U" })
			return R(res, true, "Got message", message)
		} else {
			let message = await models.messages.findOne({
				where: {
					id: req.body.id
				}
			});
			message?.update({ programmer_message_status: "U" })
			return R(res, true, "Got message", message)
		}

	}),

	update_remove_my_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let data = req.body.role_id
		console.log("Update msg data -", req.body.role_id)

		if (data == 1) {
			let message = await models.messages.findOne({
				where: {
					id: req.body.id
				}
			});
			message?.update({ buyer_delete_status: "T" })
			return R(res, true, "Remove message", message)
		} else {
			let message = await models.messages.findOne({
				where: {
					id: req.body.id
				}
			});
			message?.update({ provider_delete_status: "T" })
			return R(res, true, "Remove message", message)
		}

	}),

	customer_releasepayment_checkbox: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log("steps:-", req.query.id)
		let project_id = req.query.id;
		let project_images = await models.project_images.findOne({
			where: {
				project_id: project_id?.toString()
			}
		})

		return R(res, true, "All steps", project_images)

	}),







	public_me: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		// const w = req.query
		// const user = JSON.parse(w)
		const user_id = req.query.id

		console.log("publi_me body", req.query.id)

		const userdetails = await models.users.findOne({
			where: {
				id: user_id?.toString()
			}
		})



		return R(res, true, "User data", userdetails);


	}),

	public_profile_api: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		const user = req.query.id

		const projectdetails = await models.projects.findAll({
			where: {
				[Op.or]: [
					{
						creator_id: user?.toString()
					},
					{
						programmer_id: user?.toString()
					}
				]
			},

			include: [
				{
					model: models.users,
					as: "programmer",
					where: {
						id: { [Op.col]: "programmer_id" },
					},
					attributes: ["user_name"],
					required: false,
				},


				{
					model: models.users,
					as: "creator",
					where: {
						id: { [Op.col]: "creator_id" },
					},
					attributes: ["user_name", "id"],
					required: false,
				},



				{
					model: models.reviews,
					as: "reviews",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					attributes: ["rating", "comments", "review_post_date", "provider_rate1", "provider_rate2", "provider_rate3", "provider_rate4"],
					required: false,

				},
			],


			order: [["project_post_date", "DESC"]]
		})

		if (!projectdetails) {
			return
		}

		return R(res, true, "User data", projectdetails);
	}),

	public_profile_total_jobs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		const user = req.query.id;

		const total = await models.projects.findAndCountAll({
			where: {
				[Op.or]: [
					{
						creator_id: user?.toString(),
						project_status: 5
					},
					{
						programmer_id: user?.toString(),
						project_status: 5
					}
				]
			},
		})

		const totaljobs = total.count

		return R(res, true, "Total jobs", totaljobs);
	}),

	public_user_reviews: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let user = await models.users.findOne({
			where: {
				id: req.query.id?.toString()
			}
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		if (user?.role_id == 1) {
			var user_reviews = await models.reviews.findAll({

				where: {
					buyer_id: user.id
				},

				include: [
					{
						model: models.projects,
						as: "project",
						where: {
							id: { [Op.col]: "project_id" },
						},
						attributes: ["project_name"],
						required: false,
					},
					{
						model: models.users,
						as: "provider",
						where: {
							id: { [Op.col]: "provider_id" },
						},
						attributes: ["user_name"],
						required: false,
					}
				],
				attributes: ['rating', 'project_id', 'buyer_id', 'provider_id'],
			})

			//console.log(user_reviews);


			user_reviews = user_reviews.reverse()

			return R(res, true, "User reviews", user_reviews);

		}


		var provider_reviews = await models.reviews.findAll({

			where: {
				provider_id: user.id
			},

			include: [
				{
					model: models.projects,
					as: "project",
					where: {
						id: { [Op.col]: "project_id" },
					},
					attributes: ["project_name"],
					required: false,
				},
				{
					model: models.users,
					as: "buyer",
					where: {
						id: { [Op.col]: "buyer_id" },
					},
					attributes: ["user_name"],
					required: false,
				}
			],
			attributes: ['rating', 'project_id', 'buyer_id', 'provider_id'],
		})

		//console.log(provider_reviews);


		user_reviews = provider_reviews.reverse()

		return R(res, true, "User reviews", provider_reviews);





	}),








	offer_reviews_feedback: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log("The query from backend is", req.query)

		let projectId = req.query.id?.toString();

		let bids = await models.bids.findAll({
			where: {
				project_id: projectId
			}
		})

		let arr = [];

		for (let i = 0; i < bids.length; i++) {
			let reviews = await models.reviews.findAll({
				where: {
					provider_id: bids[i]?.user_id,
				}
			})

			//console.log("reviews are", reviews)
			let public_avg_rating: number = 0;

			if (reviews != null) {
				let public_reviews: any = [];

				public_reviews = reviews;

				// public_reviews.forEach(function (curr: any) {
				// 	public_avg_rating += curr?.rating;
				// });

				for (let i = 0; i < public_reviews.length; i++) {
					public_avg_rating += Number(public_reviews[i]?.rating);
				}

				// public_reviews.map((m: any) => {
				// 	public_avg_rating += m?.rating;
				// })


				public_avg_rating = Number(public_avg_rating / public_reviews?.length);

				public_avg_rating = Number(public_avg_rating.toFixed(2));
			}



			let projects = await models.projects.findAndCountAll({
				where: {
					programmer_id: bids[i]?.user_id,
					project_status: 5
				}
			})
			let obj = {
				id: bids[i]?.user_id,
				totalproject: projects.count,
				public_avg_rating: Number(public_avg_rating)
			};
			arr.push(obj)
			console.log("public_avg_rat", public_avg_rating)
		}



		console.log(arr)

		return R(res, true, "IIof", arr);


	}),


	project_finalise_image: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let proj_img = await models.project_images.findOne({
			where: {
				project_id: req.query?.id?.toString(),
			},
		});

		if (proj_img?.approved == 2 && proj_img?.adminApprove == 1) {

			let new_attach: any = proj_img?.attach_file.split(",");

			console.log("new attach before", new_attach);

			let adap = await models.admin_apprv_imgs.findOne({
				where: {
					id: "2",
				},
			});
			let newarr = [];

			for (let i = 0; i < new_attach?.length; i++) {
				if (adap?.images.includes(new_attach[i])) {

					let obj = {
						id: proj_img?.project_id,
						project_name: proj_img?.project_name,
						post_date: proj_img?.upload_date,
						attach_file: new_attach[i],
					};
					newarr.push(obj);
				}
			}

			console.log("new attach is", new_attach);

			return R(res, true, " project_finalise_image", newarr);


		}
		let emptyarr: any = [];

		return R(res, true, " project_finalise_image", emptyarr);




	}),

	save_invoice: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		let tid = req?.query.tid;
		let invoice = await models.invoices.findOne({
			where: {
				transaction_id: String(tid)
			}
		})

		if (!(invoice?.pdf_link)) {

			let files = await uploadInvoice(req, res);
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


			let invoicePath = `/pdf_generation/${year}/${month[currentDate.getMonth()]}/${files}`;
			invoice?.update({ pdf_link: invoicePath });
		}
		else {
			return R(res, true, "Invoice downloaded");
		}



		return R(res, true, "Invoice downloaded once");



	}),

	get_additional_comment: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		console.log("params is -------------------------> ", req?.query)


		let project_description = await models.project_descriptions.findAll({
			where: {
				project_id: req?.query?.id?.toString()
			}
		});

		if (!project_description) return

		return R(res, true, " not project_finalise_image", project_description);

	}),



	add_desccomment: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log("body is ", req?.query)

		let data = await Validate(res, ["project_id", "description"], schema.project.addComment, req?.body, {},);
		console.log("data for additional comment add----->>", data)

		const momentDt = moment();
		console.log("current moemt is----", momentDt);
		const mString = moment().format('YYYY-MM-DD HH:mm:ss');
		const currentDate = new Date(mString);
		console.log("current date is----", currentDate);
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');
		console.log("current datessbs is----", year, month, day);
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');
		const seconds = String(currentDate.getSeconds()).padStart(2, '0');
		console.log("current datessbs is----", hours, minutes, seconds);

		data["post_date_time"] = moment().format("YYYY MM DD HH:mm:ss");
		console.log("data[project_post_format_date]-----", data["post_date_time"]);
		const project_desc = await models.project_descriptions.create(data);

		console.log("files for additional", req?.files)

		if (req?.files) {


			let proj = await models.projects.findOne({
				where: {
					id: req?.body?.project_id
				}
			})
			if (!proj) {
				return
			}


			const month = moment(proj?.project_post_date).format('MMMM');
			const year = moment(proj?.project_post_date).format('YYYY');

			console.log("year, month", year, month);
			let files = await uploadadditionalFile(req, res, { month: month, year: year });
			let concatenatedData = files.join(',');

			proj?.update({ attachment_name: Sequelize.literal(`concat(attachment_name, ',', '${concatenatedData}')`) })
		}



		return R(res, true, "Comment Added", project_desc);

	}),







	delete_additional_file: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		let bid = await models.bids.findOne({
			where: {
				id: req?.body?.id.toString()
			}
		})

		let file = req?.body?.filename?.toString();

		console.log("the filename is ", file);

		const valuesArray: any = bid?.bid_file?.split(',').filter(value => value !== file);

		console.log("values array is:-", valuesArray);

		if (valuesArray?.length) {
			const updatedfiles = valuesArray.join(",");
			await bid?.update({ bid_file: updatedfiles });
		} else {
			await bid?.update({ bid_file: "" });
		}



		const date = moment.unix(Number(bid?.bid_time));

		const year = date.format('YYYY');
		const month = date.format('MMMM');

		console.log("check for time--> ", month, year);


		let files = await deleteadditionalFile(req, res, { month: month, year: year, file: file });

		return R(res, true, "File has been deleted", files);

	}),








	delete_profile_picture: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		let user = await models.users.findOne({
			where: {
				id: req?.query?.id?.toString(),
				prof_pic: req?.body?.prof_pic
			}
		})

		if (!user) return R(res, false, "no user found", user)


		await deleteprofilepic(req, res, req?.body?.prof_pic)
		await user?.update({ logo: "" })

		return R(res, true, "Profile picture deleted", user)


	}),


	delete_portfolio_picture: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		console.log("id is", req?.query?.id?.toString())
		let user = await models.users.findOne({
			where: {
				id: req?.query?.id?.toString(),
				//prot_pic: req?.body?.prot_pic
			}
		})

		if (!user) return R(res, false, "no user found", user)


		const valuesArray: any = user?.prot_pic?.split(',').filter(value => value !== req?.body?.prot_pic);

		console.log("values array is:-", valuesArray);

		if (valuesArray?.length) {
			const updatedfiles = valuesArray.join(",");
			await user?.update({ prot_pic: updatedfiles });
		} else {
			await user?.update({ prot_pic: "" });
		}


		await deleteportfoliopic(req, res, req?.body?.prot_pic)
		//await user?.update({ prof_pic: "" })

		return R(res, true, "Profile picture deleted", user)


	}),

	page_details: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		let pg_res = await models.page_details.findAll({
			where: {

				language: "en"
			}
		});
		console.log("the page details is :-", pg_res);
		return R(res, true, " Projects list", pg_res);
	}),

	project_detail_seo: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		console.log("params for seo is---> ", req.query.id);
		let pg_res = await models.projects.findOne({
			where: {
				id: req.query.id?.toString()
			},
			attributes: ["project_name", "description"],

		});
		console.log("pg res is", pg_res)
		return R(res, true, " Projects list", pg_res);
	}),

	public_profile_finalised_image: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		// const opt = {
		// 	page: parseInt(req.query.page?.toString() || "0"),
		// 	limit: parseInt(req.query.limit?.toString() || "10"),
		// };


		let user = await models.users.findOne({
			where: {
				id: req?.query?.id?.toString()
			}
		})

		if (!user) {
			return R(res, false, "No user found!");
		}

		let projects: any = await models.project_images.findAll({
			where: {
				adminApprove: 1,
				approved: 2,
				sup_id: req?.query?.id?.toString()
			},
			order: [["project_post_date", "DESC"]],
			//offset: opt.page * opt.limit,
		})

		let apr = await models.admin_apprv_imgs.findOne({
			where: {
				id: "2"
			}
		})

		//let arr: string = [];

		let arr: any = []
		let cnt: number = 0;

		for (let i = 0; i < projects.length; i++) {
			let obj = {}

			let attachment = projects[i].attach_file
			let project_name = projects[i].project_name
			let id = projects[i].project_id
			let date = projects[i].upload_date
			let new_attach: any = attachment.split(",")
			new_attach.map((m: any) => {
				if (apr?.images.includes(m)) {
					obj = {
						a: m,
						b: project_name,
						c: id,
						d: date
					}
					arr.push(obj)
					cnt++;
				}
			})

			// if (cnt >= opt.limit) {
			// 	break;
			// }

			//arr = [...arr, new_attach]
		}

		console.log("new attach:-", arr)

		//let list = projects.rows;
		//let count = projects.length;

		return R(res, true, "finalised image all list", arr);
	}),





};
