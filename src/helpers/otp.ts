const _crypto = require("crypto");
import config from "@config/env";
import axios from "axios";
import env from "@config/env";
/**
 * Generate password from allowed word
 */
const digits = "123456789";
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const upperCase = alphabets.toUpperCase();
const specialChars = "#!&@";
const key = config.secret;

function rand(min: number, max: number) {
	const random = Math.random();
	return Math.floor(random * (max - min) + min);
}

export default {
	/**
	 * Generate OTP of the length
	 * @param  {number} length length of password.
	 * @param  {object} options
	 * @param  {boolean} options.digits Default: `true` true value includes digits in OTP
	 * @param  {boolean} options.alphabets Default: `false` true value includes alphabets in OTP
	 * @param  {boolean} options.upperCase Default: `false` true value includes upperCase in OTP
	 * @param  {boolean} options.specialChars Default: `false` true value includes specialChars in OTP
	 */
	generate: function (length: any, options: any) {
		length = length || 10;
		const generateOptions = options || {};

		generateOptions.digits = Object.prototype.hasOwnProperty.call(
			generateOptions,
			"digits",
		)
			? options.digits
			: true;
		generateOptions.alphabets = Object.prototype.hasOwnProperty.call(
			generateOptions,
			"alphabets",
		)
			? options.alphabets
			: false;
		generateOptions.upperCase = Object.prototype.hasOwnProperty.call(
			generateOptions,
			"upperCase",
		)
			? options.upperCase
			: false;
		generateOptions.specialChars = Object.prototype.hasOwnProperty.call(
			generateOptions,
			"specialChars",
		)
			? options.specialChars
			: false;

		const allowsChars =
			((generateOptions.digits || "") && digits) +
			((generateOptions.alphabets || "") && alphabets) +
			((generateOptions.upperCase || "") && upperCase) +
			((generateOptions.specialChars || "") && specialChars);
		let password = "";
		while (password.length < length) {
			if (password.length == 1 && password == "0") {
				password = "1";
			}
			const charIndex = rand(0, allowsChars.length - 1);
			password += allowsChars[charIndex];
		}
		return password.toString();
	},

	hash(phone: any, otp: any, expiresAfter = 3, algorithm = "sha256") {
		otp = otp.toString();
		const ttl = expiresAfter * 60 * 1000; //Expires after in Minutes, converteed to miliseconds
		const expires = Date.now() + ttl; //timestamp to 1 minutes in the future
		const data = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp
		const hashBase = _crypto
			.createHmac(algorithm, key)
			.update(data)
			.digest("hex"); // creating SHA256 hash of the data
		// Hash.expires, format to send to the user
		// you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
		return `${hashBase}.${expires}`;
	},

	verify(phone: any, otp: any, hash: any, algorithm = "sha256") {
		otp = otp.toString();
		if (!hash.match(".")) return false; // Hash should have at least one dot
		// Separate Hash value and expires from the hash returned from the user(
		let [hashValue, expires] = hash.split(".");
		// Check if expiry time has passed
		let now = Date.now();
		if (now > expires) return false;
		// Calculate new hash with the same key and the same algorithm
		let data = `${phone}.${otp}.${expires}`;
		let newCalculatedHash = _crypto
			.createHmac(algorithm, key)
			.update(data)
			.digest("hex");
		// Match the hashes
		return newCalculatedHash === hashValue;
	},

	generateMail: (name: string) => {
		let splitName = name.split(" ");

		let firstName = splitName[0];
		let secondName = splitName[1];

		return `${secondName}${firstName}@gmail.com`.toLowerCase();
	},

	sendSms: async (mobile: any, otp: any) => {
		let params = {};
		let url = "";

		axios
			.get(url, { params: params })
			.then((response) => console.log(response))
			.catch((err) => console.error(err));

		return;
	},
};
