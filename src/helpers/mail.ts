import mail from "@config/mail";
import { any, object } from "joi";
import nodemailer from "nodemailer";

export async function sendMail(
	data: any
) {
	const { to, html, body, subject, isAsync, attachment } = data;
	const transporter = nodemailer.createTransport({
		host: 'machining-4u.co.uk',
		port: 465,
		secure: true,
		//	service: 'gmail',
		auth: {
			user: mail.mailfrom,
			pass: mail.mailuserpwd,
		},
		//tls: { ciphers: "SSLv3" },
	});

	let mailOption;
	mailOption = {
		from: mail.mailfrom,
		to: to,
		subject: subject || "",
		html: html || body,

	};

	// if (isAsync) {
	// 	await transporter.sendMail(mailOption, function (error, info) {
	// 		if (error) {
	// 			console.log(error);
	// 		} else {
	// 			console.log("Email sent for verification: " + info.response);
	// 		}
	// 	});
	// } else {
	// 	return transporter.sendMail(mailOption);
	// }
	return
}

export const site_mail_data = {
	"!site_name": "machining-4u.co.uk",
	"!site_url": "www.machining-4u.co.uk",
	"!contact_url": "admin@machining.co.uk",
	"!site_title": "Machining",


}
