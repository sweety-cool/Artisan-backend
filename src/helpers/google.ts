import { OAuth2Client } from "google-auth-library";
import env from "@config/env";

const client = new OAuth2Client(env.GoogleClientId);

export async function verify(token: any) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: env.GoogleClientId, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();

	if (!payload) {
		return null;
	}
	const userid = payload["sub"];
	return payload;
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
}

export interface GoogleLoginData {
	iss: "https://accounts.google.com";
	nbf: 1657717895;
	aud: "1027287126016-7sspf54kahiag1renibpt9vnvi7nph84.apps.googleusercontent.com";
	sub: "105923223757405800131";
	email: "harsh.dqot@gmail.com";
	email_verified: true;
	azp: "1027287126016-7sspf54kahiag1renibpt9vnvi7nph84.apps.googleusercontent.com";
	name: "harsh raj";
	picture: "https://lh3.googleusercontent.com/a/AItbvml0Bnstraa4CW4Jq3pLATkAZKaWhqhyFMWXwitD=s96-c";
	given_name: "harsh";
	family_name: "raj";
	iat: 1657718195;
	exp: 1657721795;
	jti: "416e52c3bff460b96d71b16aa924887ef58fb794";
}
