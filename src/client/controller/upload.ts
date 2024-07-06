import { Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import models from "@model/index";
import db from "@db/mysql";
import env from "@config/path";
import { UploadedFile } from "express-fileupload";
import path from "path";

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		let publicPath = env.project;

		if (!req.files) {
			return R(res, false, "No file uploaded!");
		}

		const file = req.files.file;
		const data: any = [];

		function move(image: any) {
			const file = image;
			let filename = file?.name;
			try {
				const extensionName = path?.extname(filename ?? "");

				// const allowedExtension = [".png", ".jpg", ".jpeg"];

				// if (!allowedExtension.includes(extensionName)) {
				// 	return res.json({ message: "Invalid Image", status: false });
				// }

				filename = "" + Date.now() + req.user?.id + extensionName;

				file.mv(`${publicPath}${filename}`);
			} catch (e) {
				return R(res, false, "File upload failed");
			}

			data.push(filename);
		}

		Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);

		return R(res, true, "files uploaded", data);
	}),
};
