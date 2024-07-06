import { Request, Response, NextFunction } from "express";

export function R(
	res: Response,
	status: boolean,
	message: String,
	data?: any,
	meta?: any,
) {
	res.json({
		status: status,
		message: message,
		data: data ?? {},
		meta: meta ?? {},
	});
}
export function _R(status: boolean, message: String, data?: any, meta?: any) {
	return {
		status: status,
		message: message,
		data: data ?? {},
		meta: meta ?? {},
	};
}

export function asyncWrapper(callback: any) {
	return function (req: Request, res: Response, next: NextFunction) {
		callback(req, res, next).catch((err: any) => {
			console.log(err);
			next(err);
		});
	};
}

export const _asyncWrapper =
	(fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			fn(req, res, next);
		} catch (e) {
			console.log("error", e);
			next(e);
		}
	};

/*
	Post.findAndCountAll({
		where: {...},
		order: [...],
		limit: 5,
		offset: 0,
	}).then(function (result) {
		res.render(...);
	});
*/
