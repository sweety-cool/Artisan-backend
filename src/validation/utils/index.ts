// // 👇️ ts-nocheck ignores all ts errors in the file
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-nocheck

import { R } from "@helpers/response-helpers";
import Joi from "joi";

export const Pick = (keys: any, object: any) => {
	if (keys.length === 0) {
		return object;
	}
	const subset = Object.fromEntries(
		keys
			.filter((key: any) => key in object) // line can be removed to make it inclusive
			.map((key: any) => [key, object[key]]),
	);

	return subset;
};

export const Validate = (
	res: any,
	keys: any,
	obj: any,
	body: any,
	{ unknown = false },
) => {
	let pick = Pick(keys, obj);
	let schema = Joi.object(pick).unknown(unknown).validate(body);
	if (schema.error) {
		return R(res, false, schema.error.message);
	}

	let data = schema.value;
	return data;
};
