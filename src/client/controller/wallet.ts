import { Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import models from "@model/index";
import db from "@db/mysql";
import { uploadFile, uploadOneFile } from "@helpers/upload";
import { Pick, Validate } from "validation/utils";
import schema from "validation/schema";
import moment from "moment";
import { Op } from "sequelize";
import axios from "axios";
import { sendMail, site_mail_data } from "@helpers/mail";

import mail from "@config/mail";

import paypal from "@paypal/checkout-server-sdk"

const clientId = "AT_5r1CUj-A5aDvr-MjLuZNTfIdxJYdCuQlpF8GVq9HRvL-IjEjQMAm1ITlFZjdhBKOXt8eDdo2zTitG";
const clientSecret = "EDpe6zEf4tl7NYza6B8HuwB6cwRmUglcXxiHK8uFA1Y7QeeoAZRE0YRY_5vMlzy_0ppxinAVxbQGZC87";
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// import Stripe from "stripe";


// const stripe = new Stripe('sk_test_51P10WjSI5JkjOQYeRJzK1Jf8ZRSwvLKIU63oD7qQKL10vqYWIM2WLUsHUYkiWiY5j5wmPF7FVVwomeICaTUzirQ300yJv1rB05', {
// 	apiVersion: '2023-10-16',
// });


import { Cashfree } from "cashfree-pg";

const crypto = require("crypto")

Cashfree.XClientId = "TEST10167206cb646b2c5b786024977f60276101";
Cashfree.XClientSecret = "cfsk_ma_test_11edc7bec69b08ca96524626c30b84db_283d57aa";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		res.send("Hello from wallet ");
	}),

	// create_order: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

	// 	console.log("the create order project_id is:-", req?.body?.id)



	// 	const project_id = req?.body?.id

	// 	let proj = await models.projects.findOne({
	// 		where: {
	// 			id: project_id
	// 		}
	// 	})

	// 	let bid_details: any = await models.bids.findOne({
	// 		where: {
	// 			project_id: project_id,
	// 			user_id: proj?.programmer_id
	// 		}
	// 	})



	// 	const delivery_address = await models.delivery_contacts.findOne({
	// 		where: {
	// 			project_id: project_id
	// 		}
	// 	})

	// 	console.log("delivery_address", delivery_address)


	// 	const myString = `${delivery_address?.name}`;
	// 	console.log("mystr----", myString)


	// 	// Split the string based on spaces
	// 	const wordsArray = myString.split(" ");
	// 	const first_name = wordsArray[0];
	// 	const last_name = wordsArray[1];


	// 	const userBillingAddress = {
	// 		"address_line_1": `${delivery_address?.address}`,
	// 		"admin_area_2": `${delivery_address?.city}`,
	// 		"admin_area_1": `${delivery_address?.postalcode}`,
	// 		"postal_code": `${delivery_address?.postalcode}`,
	// 		"country_code": "GB"

	// 	};

	// 	// let request = new paypal.orders.OrdersCreateRequest();
	// 	// request.prefer("return=representation");
	// 	// request.requestBody({
	// 	// 	intent: "CAPTURE",

	// 	// 	purchase_units: [{
	// 	// 		amount: {
	// 	// 			currency_code: "GBP",
	// 	// 			value: `${bid_details?.bid_amount_gbp}`,
	// 	// 		},
	// 	// 		shipping: {
	// 	// 			address: userBillingAddress, // Use collected billing address
	// 	// 		},
	// 	// 	}],
	// 	// 	application_context: {
	// 	// 		shipping_preference: 'NO_SHIPPING',
	// 	// 	},


	// 	// });

	// 	// const response = await client.execute(request);
	// 	// console.log(response.result.id)





	// 	try {
	// 		// Create order logic here, interacting with Stripe API
	// 		const session = await stripe.checkout.sessions.create({
	// 			payment_method_types: ['card'],
	// 			line_items: [
	// 				{
	// 					price_data: {
	// 						currency: 'inr',
	// 						product_data: {
	// 							name: 'ABC',
	// 						},
	// 						unit_amount: bid_details?.bid_amount_gbp * 100, // Amount in cents
	// 					},
	// 					quantity: 1,
	// 				},
	// 			],
	// 			mode: 'payment',
	// 			success_url: 'http://localhost:3000/account/AfterPaypalView',
	// 			cancel_url: 'http://localhost:3000/machining/listing',
	// 			metadata: {
	// 				project_id: project_id,
	// 				amount: bid_details?.bid_amount_gbp,
	// 			},
	// 		});

	// 		return R(res, true, "Order Created", { id: session.id });
	// 	} catch (error) {
	// 		console.error('Error creating order:', error);
	// 		return R(res, false, "Error Occured while createing order", { error: error });
	// 	}


	// 	//return R(res, true, "Order Created", { id: response.result.id });

	// }),






	create_order: asyncWrapper(async (req: UserAuthRequest, res: Response) => {


		function generateOrderId(): string {
			const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
			const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string

			return `${timestamp}${randomString}`;
		}



		console.log("the create order project_id is:-", req?.body?.id)



		const project_id = req?.body?.id

		let proj = await models.projects.findOne({
			where: {
				id: project_id
			}
		})

		let bid_details: any = await models.bids.findOne({
			where: {
				project_id: project_id,
				user_id: proj?.programmer_id
			}
		})



		const delivery_address = await models.delivery_contacts.findOne({
			where: {
				project_id: project_id
			}
		})

		console.log("delivery_address", delivery_address)


		const myString = `${delivery_address?.name}`;
		console.log("mystr----", myString)


		// Split the string based on spaces
		const wordsArray = myString.split(" ");
		const first_name = wordsArray[0];
		const last_name = wordsArray[1];


		const userBillingAddress = {
			"address_line_1": `${delivery_address?.address}`,
			"admin_area_2": `${delivery_address?.city}`,
			"admin_area_1": `${delivery_address?.postalcode}`,
			"postal_code": `${delivery_address?.postalcode}`,
			"country_code": "GB"

		};



		



		try {

			let request: any = {
				"order_amount": `${String(bid_details?.bid_amount_gbp)}`,
				"order_currency": "INR",
				"order_id": await generateOrderId(),
				"customer_details": {
					"customer_id": "Animesh",
					"customer_phone": "9999999999",
					"customer_name": "Animesh",
					"customer_email": "webcodder@example.com"
				},
			}

			Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
				console.log(response.data);
				return R(res, true, "Order Created", { id: response.data });
				//res.json(response.data);

			}).catch(error => {
				console.error(error.response.data.message);
			})


		} catch (error) {
			console.log(error);
			return R(res, false, "Error Occured while createing order", { error: error });
		}


		//return R(res, true, "Order Created", { id: response.result.id });

	}),




	pay_machinist: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			[],
			schema.wallet.pay_machinist,
			req.body,
			{},
		);
		console.log("req query is:---", req.query.chkstate)


		let project = await models.projects.findByPk(data.project_id);

		const proj_img = await models.project_images.findOne({
			where: {
				project_id: data.project_id
			},
		})

		if (req.query.chkstate == "true") {
			proj_img?.update({ approved: 2 })
		} else {
			proj_img?.update({ approved: 1 })
		}

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		if (!project.programmer_id) {
			return R(res, false, "Invalid Request");
		}

		let bid: any = await models.bids.findOne({
			where: {
				project_id: data.project_id,
				user_id: project.programmer_id,
			},
		});

		if (!bid) return R(res, false, "Invalid	Request");
		let mach = await models.users.findOne({
			where: {
				id: project.programmer_id
			}
		})


		let machinist_wallet = await models.user_balance.findOne({
			where: {
				user_id: project.programmer_id,
			},
		});

		if (!machinist_wallet) {
			machinist_wallet = await models.user_balance.create({
				user_id: project.programmer_id,
				amount: 0.0,
				amount_gbp: 0.0,
			});
		}

		machinist_wallet.increment({
			amount: (bid.bid_amount_gbp) * (100 - 14.9) / 100,
			amount_gbp: bid.bid_amount,
		});
		var today = new Date();

		project.project_status = "5";
		project.fund_release_date = today;

		await project.save();

		const cdate = new Date()
		let notifdata: any = {
			email_type: "Pay machinist",
			email_subject: "Machinist selected",
			supplier_id: project.programmer_id,
			email_body: `Dear ${mach?.user_name},

				Congratulations! Your customer is satisfied with the quality of your work for the project ${project?.project_name}. Your client has just released the funds to your account on Machining-4u.
				
				Machining-4u has taken a small commission fee as a requirement for being used as a third party service.
				
				The amount you've had added to your account is £${bid.bid_amount} (£(${bid.bid_amount_gbp}*(100-14.9)/100) minus the Machining-4u commission).
				
				To access your account on Machining-4u, click here .
				
				Regards,
				
				Machining-4u
				
				www.machining-4u.co.uk`,
			notif_date: cdate,
			message_status: "R",
			project_id: project?.id,
			customer_id: req.user?.id
		}


		let notifs = await models.notif_email_list.create(notifdata)

		console.log("time:--", Number(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()))

		let transaction_details = await models.transactions.findOne({
			where: {
				project_id: data.project_id,
			},
		});
		if (!transaction_details) {
			return R(res, false, "Invalid  transaction");
		}

		await transaction_details.update({
			//amount: data.amount,
			amount_gbp: transaction_details.amount_gbp,
			type: "Escrow Transfer ",
			transaction_time: moment().unix(),
			description: "Paypal",
			user_type: "customer",
			status: "Completed",


		});


		const invoicedata: any = {
			inv_no: new Date().getFullYear() + transaction_details.id.toString(),
			project_id: project.id,
			transaction_id: transaction_details.id,
			commission_rate: 14.90,
			pdf_link: "",
			created_date: Date.now()
		}

		await models.invoices.create(invoicedata)






		let machinist = await models.users.findOne({
			where: {
				id: project.programmer_id
			}
		})

		let task_id = 108;

		const api_data_rep: object = {
			"!project": project.project_name,
			"!username": machinist?.user_name,
			"!bid_amount": transaction_details.amount_gbp,
			"!withdraw_url": `${mail.mailbaseurl}account/withdraw`,
			"!amount": ((transaction_details.amount_gbp) * (100 - 14.9) / 100),
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

		sendMail({ to: machinist?.email, subject, body });

		let user = await models.users.findOne({
			where: {
				id: project.creator_id
			}
		})

		let task_id_cust = 97;

		const api_data_rep_cus: object = {
			"!project": project.project_name,
			"!username": user?.user_name,
			"!bid_amount": transaction_details.amount_gbp,
			"!withdraw_url": `${mail.mailbaseurl}account/withdraw`,
			"!amount": transaction_details.amount_gbp,
			"!supplier_username": machinist?.user_name,
			"!feedback_url": `${mail.mailbaseurl}machining/${project.project_name.split(" ").join("-")}-${project?.id}`,
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

		//sendMail({to: user?.email, subject, body });

		return R(res, true, "Paid to Machinist", { transaction_details });
	}),

	paypal_transaction_complete: asyncWrapper(async (req: UserAuthRequest, res: Response) => {

		console.log(req.body)
		const orderID = req.body.key1.orderID;
		//const authrequest = new paypal.orders.OrdersAuthorizeRequest(orderID);
		const request = new paypal.orders.OrdersCaptureRequest(orderID);
		//request.requestBody({});



		try {

			//const auth = await client.execute(authrequest);

			//console.log("auth response:-", auth.result);
			const capture = await client.execute(request);
			console.log(`Response: ${JSON.stringify(capture)}`);
			console.log(`Capture: ${JSON.stringify(capture.result)}`);
			const result = capture.result;
			const resJson = {
				result
			};
			return R(res, true, "Payment Completed", { result: resJson });
			// return capture.result;
		} catch (err) {
			// Handle any errors from the call
			console.error(err);
			return R(res, false, "Error Processing Payment", { result: err });

		}
		//console.log("Payment complete with stripe")

		//return R(res, true, "Payment Completed", { result: "resJson" });
	}),
};
