import { Request, Response } from "express";
import { R } from "./response-helpers";
import webpush from "web-push";
import env from "@config/env";
import axios from "axios";
import models from "@model/index";

export const sendSms = (mobile: String) => {
	return true;
};

export function youtubeId(url: any) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	return match && match[2].length === 11 ? match[2] : null;
}

export async function SendNotificationToUser(
	res: Response,
	user_id: any,
	data: any,
) {
	webpush.setVapidDetails(
		env.webPushContact,
		env.publicVapidKey,
		env.secretVapidKey,
	);
	const user = await models.users.findByPk(user_id);

	// if (user && user.subscription) {
	// 	let subscription: any = user.subscription;
	// 	const payload = JSON.stringify(data);

	// 	webpush
	// 		.sendNotification(subscription, payload)
	// 		.then((result) => console.log(result))
	// 		.catch((e) => console.log(e.stack));

	// 	return "Notification Sent";
	// }
}

export function isNumeric(str: any) {
	// if (typeof str != "string") return false; // we only process strings!
	return (
		!isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str))
	); // ...and ensure strings of whitespace fail
}
