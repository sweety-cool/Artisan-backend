import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { users } from "@model/users";
import env from "@config/env";

const ignorePaths = [
	"/user/auth/login",
	"/user/auth/test",
	"/user/auth/register",
	"/user/auth/forgot-username",
	"/user/auth/generate-new-password",
	"/user/auth/send-mobile-otp",
	"/user/auth/get-otp",
	"/user/auth/verify-mobile-otp",
	"/user/project/list",
	"/user/project/detail",
	"/user/project/add-temp",
	"/user/auth/google-login",
	"/user/auth/register",
	"/user/auth/forgot-password",
	"/public",
	"/send-test-notification",
	"/user/auth/verify-otp",
	"/user/auth/send-otp",
	"/user/project/get-my-temp",
	"/user/project/image-list",
	"/user/project/all-lists",
	"/user/project/project-gallery",
	"/user/project/all-reviews",
	"/user/project/review-proj",

	"/user/project/public-me",
	"/user/project/public-profile-total-jobs",
	"/user/project/public-profile-api",
	"/user/project/public-user-reviews",

	"/user/project/offer-reviews-feedback",
	"/user/project/project_finalise_image",
	"/user/project/get-additional-comment",
	"/user/project/page-details",	
	"/user/project/project-detail-seo",
	"/user/project/public-profile-finalised-image",
	"/user/project/deposit-fund",
	// "/user/webhook/deposit-fund",
];

export interface UserAuthRequest extends Request {
	user?: users; // or any other type
	token: string;
}


export interface UserAuthBufferRequest extends Request {
	user?: users; // or any other type
	token: string;
	rawBody?: Buffer;
}

export default async function verifyUser(
	req: any,
	res: Response,
	next: NextFunction,
) {
	let token;

	let ignore = ignorePaths.indexOf(req.path) > -1;

	if (req.url.startsWith("/public")) {
		ignore = true;
	}

	if (
		req.method === "OPTIONS" &&
		req.headers.hasOwnProperty("access-control-request-headers")
	) {
		return res.send("No DATA");
		// const hasAuthInAccessControl = !!~req.headers[
		// 	"access-control-request-headers"
		// ]
		// 	.split(",")
		// 	.map(function (header) {
		// 		return header.trim();
		// 	})
		// 	.indexOf("authorization");

		// if (hasAuthInAccessControl) {
		// 	return next();
		// }
	}

	if (req.headers && req.headers.authorization) {
		const parts = req.headers.authorization.split(" ");
		if (parts.length === 2) {
			const scheme = parts[0];
			const credentials = parts[1];

			if (/^Bearer$/i.test(scheme)) {
				token = credentials;
				req.token = token;
			} else {
				if (!ignore) {
					return res.json({
						status: false,
						message: "Invalid request.",
						data: null,
					});
				}
			}
		} else {
			if (!ignore) {
				return res.json({
					status: false,
					message: "Invalid request.",
					data: null,
				});
			}
		}
	}

	if (!token && !ignore) {
		return res.json({
			status: false,
			message: "No authorization token was found.",
			data: null,
		});
	}

	if (token) {
		let user: any;
		try {
			user = jwt.verify(token ?? "", env.secret);
		} catch (e) {
			console.table(e);
		}

		if (!user && !ignore) {
			return res.status(401).json({
				status: false,
				message: "Invalid token.",
				data: null,
			});
		}

		if (user?.id) {
			try {
				req.user = user;
			} catch (e) {}
		}
	}

	return next();
}
