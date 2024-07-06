import express, { Request, Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import Joi from "joi";
import models from "@model/index";
import { Op, Sequelize } from "sequelize";
import db from "@db/mysql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "@config/env";
import { Validate } from "@validation/utils";
import schema from "@validation/schema";
import { uploadFile, uploadMachiningFile, uploadOneFile, uploadProtpic } from "@helpers/upload";
import moment from "moment";
import { sendMail, site_mail_data } from "@helpers/mail";
import crypto from 'crypto';
import mail from "@config/mail";

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		return R(res, true, "Test Route from Auth");
	}),

	register: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		//console.log("data 1", req.body);

		//validation
		const schema = Joi.object({
			role: Joi.number().required(),
			email: Joi.string().required(),
			check: Joi.boolean().required(),
		})
			.unknown(true)
			.validate(req.body);


		if (schema.error) {
			return R(res, false, schema.error.message);
		}

		let data = schema.value;

		let objectToBeDeleted = ["role", "check"];

		// Check if data["check"] is true
		if (data.check) {
			let role = await models.roles.findOne({
				where: {
					id: data.role,
				},
			});

			if (!role) {
				return R(res, false, "Invalid Role");
			}

			let userExist = await models.users.count({
				where: {
					email: data.email,
				},
			});

			if (userExist > 0) {
				return R(res, false, "You already have an Account");
			}

			return R(res, true, "Account can be created", {
				role: role,
			});
		} else if (data.role === 1) {
			//user is customer

			//machinist validation


			const schema = Joi.object({
				account: Joi.string().required(),
				name: Joi.string().required(),
				surname: Joi.string().required(),
				user_name: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string()
					.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
					.required()
					.messages({
						"string.pattern.base":
							"Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
					}),
				SIREN: Joi.required(),
				company_name: Joi.required(),
				pro_user: Joi.required(),
				show_modal: Joi.required(),
			})
				.unknown(true)
				.validate(req.body);

			if (schema.error) {
				return R(res, false, schema.error.message);
			}

			let data = schema.value;

			let userPassword = data.password;

			let userExist = await models.users.count({
				where: {
					[Op.or]: [
						{
							user_name: data.user_name,
						},
						{
							email: data.email,
						},
					],
				},
			});

			if (userExist > 0) {
				return R(res, false, "Username or Email already exists");
			}

			if (req.body.pro_user == 1) {
				data["pro_user"] = 1
			}

			data["siren"] = req.body.SIREN

			data["role_id"] = 1;
			data["created"] = moment().unix();
			data["country_code"] = 2;
			const hash = crypto.createHash('md5');
			hash.update(data?.password);
			const hashedPassword = hash.digest('hex');
			console.log("hashbefore", hashedPassword)


			data.password = hashedPassword;

			objectToBeDeleted.forEach((f) => delete data[f]);

			let user = await models.users.create(data);

			const token = jwt.sign({ id: user.id }, env.secret);

			let u: any = user.toJSON();
			delete u.password;
			u["token"] = token;

			// send mail function

			const api_data_rep: object = {
				"!username": user.user_name,
				"!usertype": "customer",
				"!password": userPassword,
				"!activation_url": `${mail.mailbaseurl}auth/sign-in`
			};



			let task_id = 186;

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en",
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(
				(key) => {
					if (body?.includes(key)) {
						var re = new RegExp(key, "g");
						body = body.replace(re, api_data_rep[key]);
					}

					if (title?.includes(key)) {
						var re = new RegExp(key, "g");
						title = title.replace(re, api_data_rep[key]);
					}

					if (subject?.includes(key)) {
						var re = new RegExp(key, "g");
						subject = subject.replace(re, api_data_rep[key]);
					}
				}
			);

			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(
				(key) => {
					if (body?.includes(key)) {
						var re = new RegExp(key, "g");

						body = body.replace(re, site_mail_data[key]);
					}

					if (title?.includes(key)) {
						var re = new RegExp(key, "g");
						title = title.replace(re, site_mail_data[key]);
					}

					if (subject?.includes(key)) {
						var re = new RegExp(key, "g");
						subject = subject.replace(re, site_mail_data[key]);
					}
				}
			);

			//sendMail({to:data.email, subject, body});



			return R(res, true, "Registered", u);
		} else if (data.role === 2) {
			//user is machinist

			//machinist validation
			const schema = Joi.object({
				user_name: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string()
					.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
					.required()
					.messages({
						"string.pattern.base":
							"Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
					}),
				// password_confirmation: Joi.any()
				// 	.equal(Joi.ref("password"))
				// 	.required()
				// 	.messages({ "any.only": "{{#label}} does not match" }),
				name: Joi.string().required(),
				surname: Joi.string().required(),
				address1: Joi.string().required(),
				zcode: Joi.string().required(),
				city: Joi.string().required(),
				company_name: Joi.string().required(),
				company_number: Joi.string().required(),
				Squestion: Joi.string().required(),
				answer: Joi.string().required(),
			})
				.unknown(true)
				.validate(req.body);

			if (schema.error) {
				return R(res, false, schema.error.message);
			}

			let data = schema.value;

			const machanicPass = data.password;

			let userExist = await models.users.count({
				where: {
					[Op.or]: [
						{
							user_name: data.user_name,
						},
						{
							email: data.email,
						},
					],
				},
			});

			if (userExist > 0) {
				return R(res, false, "Username or Email already exists");
			}

			data["role_id"] = 2;
			data["created"] = moment().unix();
			data["country_code"] = 74;
			const hash = crypto.createHash('md5');
			hash.update(data?.password);
			const hashedPassword = hash.digest('hex');
			console.log("hashbefore", hashedPassword)
			data.password = hashedPassword;
			[...objectToBeDeleted, "password_confirmation"].forEach(
				(f) => delete data[f]
			);

			let user = await models.users.create(data);

			const token = jwt.sign({ id: user.id }, env.secret);

			let u: any = user.toJSON();
			delete u.password;
			u["token"] = token;

			// send mail function

			const api_data_rep: object = {
				"!username": user.user_name,
				"!usertype": "machanic",
				"!password": machanicPass,
				"!activation_url": `${mail.mailbaseurl}auth/sign-in`
			};



			let task_id = 1;

			const mailData = await models.email_templates.findOne({
				where: {
					id: task_id,
					country_code: "en",
				},
				attributes: ["title", "mail_subject", "mail_body"],
			});

			var body = mailData?.mail_body;
			var title = mailData?.title;
			var subject = mailData?.mail_subject;

			(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(
				(key) => {
					if (body?.includes(key)) {
						var re = new RegExp(key, "g");
						body = body.replace(re, api_data_rep[key]);
					}

					if (title?.includes(key)) {
						var re = new RegExp(key, "g");
						title = title.replace(re, api_data_rep[key]);
					}

					if (subject?.includes(key)) {
						var re = new RegExp(key, "g");
						subject = subject.replace(re, api_data_rep[key]);
					}
				}
			);

			(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(
				(key) => {
					if (body?.includes(key)) {
						var re = new RegExp(key, "g");

						body = body.replace(re, site_mail_data[key]);
					}

					if (title?.includes(key)) {
						var re = new RegExp(key, "g");
						title = title.replace(re, site_mail_data[key]);
					}

					if (subject?.includes(key)) {
						var re = new RegExp(key, "g");
						subject = subject.replace(re, site_mail_data[key]);
					}
				}
			);

			sendMail({ to: data.email, subject, body });




			return R(res, true, "Registered", u);
		}
	}),
	login: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//validation
		const schema = Joi.object({
			email_username: Joi.string().required(),
			password: Joi.string().required(),
		}).validate(req.body);

		if (schema.error) {
			return R(res, false, schema.error.message);
		}

		let data = schema.value;

		let user = await models.users.findOne({
			where: {
				[Op.or]: [
					{
						email: data.email_username,
					},
					{
						user_name: data.email_username,
					},
				],
			},
		});

		if (!user) {
			return R(res, false, "Invalid Credentials");
		}

		function hashPassword(password: any) {
			const hash = crypto.createHash('md5');
			hash.update(password);
			const hashedPassword = hash.digest('hex');
			console.log("hashbefore", hashedPassword)
			return hashedPassword;
		}

		function verifyPassword(plainTextPassword: any, hashedPassword: any) {
			const hashedPlainTextPassword = hashPassword(plainTextPassword);
			return hashedPlainTextPassword === hashedPassword;
		}

		// Example usage
		let plainTextPassword = data.password;
		let hashedPasswordFromDatabase = user.password; // Example MD5 hashed password from the database

		console.log("plainTextPassword", plainTextPassword);
		console.log("hashedPasswordFromDatabase", hashedPasswordFromDatabase)

		const isMatch = verifyPassword(plainTextPassword, hashedPasswordFromDatabase);

		console.log("crypt veryfy is", isMatch);

		// if (!bcrypt.compareSync(data.password, user.password || "")) {
		// 	return R(res, false, "Invalid Credentials.");
		// }

		if (isMatch == false) {
			return R(res, false, "Invalid Credentials.");
		}
		let current_date = new Date();
		user.last_seen = current_date;

		await user.save();

		await models.login_info.create({
			user_id: (user.id),
			ip_address: `${req.headers["x-forwarded-for"]}`.split(",")[0] || "",
		});

		let user_balance = await models.user_balance.findOne({
			where: {
				user_id: user.id,
			},
		});

		if (!user_balance) {
			await models.user_balance.create({
				user_id: user.id,
				amount: 0.0,
				amount_gbp: 0.0,
			});
		}

		const token = jwt.sign({ id: user.id }, env.secret);

		console.log('token is ', token)

		let u: any = user.toJSON();
		delete u.password;
		u["token"] = token;

		return R(res, true, "Logged in successfully", u);
	}),

	me: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
			include: [
				{
					model: models.country,
					as: "country_code_country",
				},
			],
			attributes: { exclude: ["password"] },
		});

		if (!user) {
			return R(res, false, "Invalid User");
		}
		return R(res, true, "User data", user);
	}),

	delivery_contacts: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log("req-->", req);
		let id: number = Number(req.query.id);
		console.log("id--------", id)
		let project = await models.projects.findOne({
			where: {
				id: id

			}

		});
		let user = await models.delivery_contacts.findOne({
			where: {
				project_id: id,
				user_id: project?.creator_id,

			},


		});


		return R(res, true, "delivery User data", user);
	}),


	update: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		// validation
		let data = await Validate(res, [], schema.user.editUser, req.body, {});







		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		let country = await models.country.findOne({
			where: {
				id: data.country_code,
			},
		});

		if (!country) {
			return R(res, false, "Invalid country");
		}
		let file;

		if (req.query?.change_pic) {
			// file upload
			file = await uploadOneFile(req, res);
		}

		if (file) {
			data["prof_pic"] = file;
			data["logo"] = file;
		}

		data["country_code"] = country.id;
		data["country_symbol"] = country.country_symbol;

		if (user?.role_id == 2) {
			data["service_desc"] = req.body.service_desc;
			data["description"] = "";
		} else {
			data["service_desc"] = "";
			data["description"] = req.body.description;
		}

		if (user?.role_id == 2 && user?.pro_user == 1) {
			data["pro_vat"] = req.body.tva;
			data["company_name"] = req.body.company_name;
			data["siren"] = req.body.siren;
		}

		await user.update(data);
		// await user.save();
		if (req.files?.file2) {
			let file2 = await uploadProtpic(req, res)
			let concatenatedData = file2.join(',');
			if (user?.prot_pic != null && user?.prot_pic != "") {
				await user?.update({ prot_pic: Sequelize.literal(`concat(prot_pic, ',', '${concatenatedData}')`) })
			} else {
				await user?.update({ prot_pic: concatenatedData })
			}

		}
		const api_data_rep: object = {
			"!username": user.user_name,
			"!data1": String(data.name),
			"!data2": String(data.surname),
			"!data3": String(data.user_name),
			"!data4": String(data.zcode),
			"!data5": String(data.description)
		}




		let task_id = 21;

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





		return R(res, true, "profile updated");
	}),

	update_pro: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		let u = await models.users.findOne({
			where: {
				id: req.body.id
			}
		});

		u?.update({ siren: req.body.SIREN, company_name: req.body.company_name, pro_user: req.body.pro_user });
		return R(res, true, "You are now a PRO Customer");
	}),

	update_address: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.user.editAddress, req.body, {});

		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		await user.update(data);
		// await user.save();

		return R(res, true, "profile updated");
	}),

	save_address: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let data = req.body;
		console.log("data address", data);

		if (data?.checkstate === 'true') {
			let usr = await models.users.findOne({
				where: {
					id: data?.user_id
				}
			})

			console.log("user is--", usr)

			if (usr) {
				await usr?.update({ address1: data.address, city: data?.city, zcode: data?.postalcode })
				//console.log("updated usr", usr)
			}

		}


		let deladd = await models.delivery_contacts.findOne({

			where: {
				project_id: data?.project_id,
			}
		})
		if (!deladd) {
			let newAddress = await models.delivery_contacts.create(data);
			console.log("address gen----->>", newAddress);
			return R(res, true, "Address saved");
		}
		else {
			await deladd?.update({
				name: data?.name,
				address: data?.address,
				postalcode: data?.postalcode,
				city: data?.city,

			})
			return R(res, true, "Address saved");

		}

	}),



	change_password: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			[],
			schema.user.change_password,
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

		function hashPassword(password: any) {
			const hash = crypto.createHash('md5');
			hash.update(password);
			const hashedPassword = hash.digest('hex');
			console.log("hashbefore", hashedPassword)
			return hashedPassword;
		}

		function verifyPassword(plainTextPassword: any, hashedPassword: any) {
			const hashedPlainTextPassword = hashPassword(plainTextPassword);
			return hashedPlainTextPassword === hashedPassword;
		}

		// Example usage
		let plainTextPassword = data.old_password;
		let hashedPasswordFromDatabase = user.password; // Example MD5 hashed password from the database

		console.log("plainTextPassword", plainTextPassword);
		console.log("hashedPasswordFromDatabase", hashedPasswordFromDatabase)

		const isMatch = verifyPassword(plainTextPassword, hashedPasswordFromDatabase);

		console.log("crypt veryfy is", isMatch);

		if (isMatch == false) {
			return R(res, false, "Old Password is not correct.");
		}


		const hash = crypto.createHash('md5');
		hash.update(data.new_password);
		const hashedPassword = hash.digest('hex');

		user.password = hashedPassword;

		await user.save();

		const api_data_rep: object = {
			"!username": user.user_name,
			"!data1": String(data.name),
			"!data2": String(data.surname),
			"!data3": String(data.user_name),
			"!data4": String(data.zcode),
			"!data5": String(data.description),
			"!url": `${mail.mailbaseurl}auth/sign-in`,
			"!newpassword": data.new_password
		};

		let task_id = 101;

		const mailData = await models.email_templates.findOne({
			where: {
				id: task_id,
				country_code: "en",
			},
			attributes: ["title", "mail_subject", "mail_body"],
		});

		var body = mailData?.mail_body;
		var title = mailData?.title;
		var subject = mailData?.mail_subject;

		(Object.keys(api_data_rep) as (keyof typeof api_data_rep)[]).forEach(
			(key) => {
				if (body?.includes(key)) {
					var re = new RegExp(key, "g");
					body = body.replace(re, api_data_rep[key]);
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, "g");
					title = title.replace(re, api_data_rep[key]);
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, "g");
					subject = subject.replace(re, api_data_rep[key]);
				}
			}
		);

		(Object.keys(site_mail_data) as (keyof typeof site_mail_data)[]).forEach(
			(key) => {
				if (body?.includes(key)) {
					var re = new RegExp(key, "g");

					body = body.replace(re, site_mail_data[key]);
				}

				if (title?.includes(key)) {
					var re = new RegExp(key, "g");
					title = title.replace(re, site_mail_data[key]);
				}

				if (subject?.includes(key)) {
					var re = new RegExp(key, "g");
					subject = subject.replace(re, site_mail_data[key]);
				}
			}
		);

		sendMail({ to: user?.email, subject, body });

		return R(res, true, "Password Changed");
	}),

	list_countries: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		let countries = await models.country_master.findAll({});

		return R(res, true, "country data", countries);
	}),

	machanic_details: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let machanic_id: number = Number(req.query.mach_id);
		console.log("recieved id--", machanic_id);

		let user = await models.users.findOne({
			where: {
				id: machanic_id,
			},
			include: [
				{
					model: models.country,
					as: "country_code_country",
				},
			],
			attributes: { exclude: ["password"] },
		});

		//console.log(user);

		if (!user) {
			return R(res, false, "Invalid User");
		}
		return R(res, true, "User data", user);


	}),

	user_balance: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let userBalance = await models.user_balance.findOne({
			where: {
				user_id: req.user?.id,
			}
		});

		console.log(userBalance);

		if (!userBalance) {
			return R(res, false, "Invalid User");
		}
		return R(res, true, "User balance data", userBalance);

	}),

	update_balance: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let balanceData = await models.user_balance.findOne({
			where: {
				user_id: req.user?.id,
			}
		});

		if (!balanceData) {
			return R(res, false, "Invalid User");
		}

		const user = await models.users.findOne({
			where: {
				id: req.user?.id
			}
		})

		const amt = req.body.val;
		const paypal_email = req.body.paypal_email;

		console.log("The amount from frontend is :-", amt);

		let gbpRate: any = await db.sequelize.query('SELECT rate_ratio FROM euro_to_gbp LIMIT 1');

		console.log('GBP Rate:', gbpRate);

		let euro_amt = amt / gbpRate[0][0].rate_ratio;

		const amountWithdraw = balanceData.amount_gbp - req.body.balance;

		balanceData.amount_gbp = req.body.balance
		balanceData.amount = 0.8 * req.body.balance


		//await balanceData.save();

		//const userMail = req.user?.email;

		//console.log(user?.email);


		if (req.body.method == "paypal") {





			let amount_withdrawn = 2;

			let data22: any = {
				type: "Withdraw",
				creator_id: user?.id,
				buyer_id: 0,
				provider_id: user?.id,
				transaction_time: moment().unix(),
				amount: euro_amt,
				amount_gbp: amt,
				status: "Pending",
				description: "Withdraw Amount From Paypal",
				paypal_address: paypal_email,
				user_type: "Supplier",
				country_code: "2"
			}

			let transac_create = await models.transactions.create(data22)


			const api_data_rep: object = {
				"!username": user?.user_name,
				"!amount": amountWithdraw

			}




			let task_id = 177;

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

			sendMail({ to: user?.email, subject, body });

			const cdate = new Date()
			let data: any = {
				email_type: title,
				email_subject: subject,
				supplier_id: req.user?.id,
				email_body: body,
				notif_date: cdate,
				message_status: "R",
				project_id: 0,
				customer_id: 0

			}


			let notifs = await models.notif_email_list.create(data)


		}
		else {



			let amount_withdrawn = 2

			let data23: any = {
				type: "Withdraw",
				creator_id: user?.id,
				buyer_id: 0,
				provider_id: user?.id,
				transaction_time: moment().unix(),
				amount: euro_amt,
				amount_gbp: amt,
				status: "Pending",
				description: "Withdraw Amount From Bank",
				paypal_address: user?.email,
				user_type: "Supplier",
				country_code: "2"
			}

			let transac_create = await models.transactions.create(data23)


			const api_data_rep: object = {
				"!username": user?.user_name,
				"!amount": amountWithdraw

			}




			let task_id = 175;

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

			sendMail({ to: user?.email, subject, body });

			const cdate = new Date()
			let data: any = {
				email_type: title,
				email_subject: subject,
				supplier_id: req.user?.id,
				email_body: body,
				notif_date: cdate,
				message_status: "R",
				project_id: 0,
				customer_id: 0

			}


			let notifs = await models.notif_email_list.create(data)


		}



		return R(res, true, "Updated balance data", balanceData);

	}),

	user_projects: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
		});

		if (user?.role_id == 1) {
			let user_project = await models.projects.findAll({
				where: {
					creator_id: req.user?.id,
					project_status: 5
				},
				attributes: ["id"],
			});


			return R(res, true, " Projects list", user_project);

		}



		let mach_project = await models.projects.findAll({
			where: {
				programmer_id: req.user?.id,
				project_status: 5
			},
			attributes: ["id"],
		});




		return R(res, true, " Projects list", mach_project);




	}),

	user_spent: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let totalSpent = await models.transactions.findAll({
			where: {
				[Op.and]: [
					{
						creator_id: req.user?.id,
					},
					{
						type: 'PAID TO MACHINIST',
					},
				],

			},
			attributes: ["amount", "amount_gbp"]

		});

		if (!totalSpent) {
			return R(res, false, "Invalid User");
		}

		return R(res, true, "Updated balance data", totalSpent);

	}),
	update_modal: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		let id = req.body.id;
		let u = await models.users.findOne({
			where: {
				id: id
			}
		})
		u?.update({ show_modal: req.body.showmodal });
		return R(res, true, "Modal hidden");
	}),






	generate_new_password: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let email = req.body.email;

		let users = await models.users.findOne({
			where: {
				email: email
			}
		})

		if (!users) {
			return R(res, false, "No user found with this email");
		}


		function generateRandomString(length: any) {
			const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

			let password = '';
			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * charset.length);
				password += charset[randomIndex];
			}

			return password;
		}

		// Generate a random string password with a length of 12 characters
		const randomPassword = generateRandomString(12);
		console.log(randomPassword);



		//creating hash and updating password


		const hash = crypto.createHash('md5');
		hash.update(randomPassword);
		const hashedPassword = hash.digest('hex');
		console.log("hashpassword", hashedPassword)

		await users?.update({ password: hashedPassword });



		//email functionality


		const api_data_rep: object = {
			"!newpassword": randomPassword,
			"!username": users?.user_name,
			"!url": 'https://www.machining-4u.co.uk/signin'
		}




		let task_id = 101;

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

		sendMail({ to: users?.email, subject, body });


		return R(res, true, "Password set");

	}),


	forgot_username: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		let email = req.body.email;

		let users = await models.users.findOne({
			where: {
				email: email
			}
		})

		if (!users) {
			return R(res, false, "No user found with this email");
		}




		//email functionality


		const api_data_rep: object = {
			"!username": users?.user_name,
			"!url": 'https://www.machining-4u.co.uk/signin',
			"!email": users?.email
		}




		let task_id = 184;

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

		sendMail({ to: users?.email, subject, body });


		return R(res, true, "Username sent to email");

	}),

};
