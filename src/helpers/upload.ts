import { Response } from "express";
import { UserAuthRequest } from "@middleware/auth";
import env from "@config/path";
import { R } from "./response-helpers";
import path from "path";
import { UploadedFile } from "express-fileupload";
import fs from 'fs';

export const uploadFile = async (req: UserAuthRequest, res: Response) => {
	try {
		let publicPath = env.project;

		if (!req.files) {
			return R(res, false, "No file uploaded!");
		}

		const file = req.files.file;
		const data: any = [];

		const move = (image: any, i: any) => {
			const file = image;
			let filename = file?.name;
			let index = i + 1;
			try {
				const extensionName = path?.extname(filename ?? "");

				// const allowedExtension = [".png", ".jpg", ".jpeg"];

				// if (!allowedExtension.includes(extensionName)) {
				// 	return res.json({ message: "Invalid Image", status: false });
				// }

				const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

				const today = new Date();
				const _path = `${today.getUTCFullYear()}/${month[today.getMonth()]}/`

				fs.mkdirSync(`${publicPath}/${_path}`, { recursive: true });


				if (req?.user?.id) {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + req.user?.id + `${index}` + extensionName;
				} else {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + `${index}` + extensionName;
				}



				file.mv(`${publicPath}${_path}${filename}`);
			} catch (e) {
				return R(res, false, "File upload failed");
			}

			data.push(filename);
		};

		Array.isArray(file)
			? file.forEach((file, i) => move(file, i))
			: move(file, 0);

		return data;
	} catch (e) {
		return R(res, false, "File upload failed");
	}
};

export const uploadOneFile = async (
	req: UserAuthRequest,
	res: Response,
	ignore?: Boolean,
) => {
	try {
		let publicPath = env.update_profile_picture;

		if (!req.files) {
			if (ignore) {
				return false;
			}
			return R(res, false, "No file uploaded!");
		}

		const file = req.files.file as UploadedFile;

		let filename = file?.name;

		const extensionName = path?.extname(filename ?? "");

		const allowedExtension = [".png", ".jpg", ".jpeg"];

		if (!allowedExtension.includes(extensionName)) {
			return res.json({ message: "Invalid Image", status: false });
		}

		filename = "" + Date.now() + req.user?.id + extensionName;

		file.mv(`${publicPath}${filename}`);

		return filename;
	} catch (e) {
		return R(res, false, "File upload failed");
	}
};

export const uploadMachiningFile = async (req: UserAuthRequest, res: Response) => {
	try {
		let publicPath = env.project;

		if (!req.files) {
			return R(res, false, "No file uploaded!");
		}

		const file = req?.files?.file2;
		const data: any = [];

		const move = (image: any, i: any) => {
			const file = image;
			let filename = file?.name;
			let index = i + 1;
			try {
				const extensionName = path?.extname(filename ?? "");

				// const allowedExtension = [".png", ".jpg", ".jpeg"];

				// if (!allowedExtension.includes(extensionName)) {
				// 	return res.json({ message: "Invalid Image", status: false });
				// }

				const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

				const today = new Date();
				const _path = `${today.getUTCFullYear()}/${month[today.getMonth()]}/`

				fs.mkdirSync(`${publicPath}/${_path}`, { recursive: true });


				if (req?.user?.id) {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + req.user?.id + `${index}` + extensionName;
				} else {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + `${index}` + extensionName;
				}



				file.mv(`${publicPath}${_path}${filename}`);
			} catch (e) {
				return R(res, false, "File upload failed");
			}

			data.push(filename);
		};

		Array.isArray(file)
			? file.forEach((file, i) => move(file, i))
			: move(file, 0);

		return data;
	} catch (e) {
		return R(res, false, "File upload failed");
	}
};

export const shippingmachiningfile = async (req: UserAuthRequest, res: Response) => {
	try {
		let publicPath = env.project;

		if (!req.files) {
			return R(res, false, "No file uploaded!");
		}

		const file = req?.files?.file;
		const data: any = [];

		const move = (image: any, i: any) => {
			const file = image;
			let filename = file?.name;
			let index = i + 1;
			try {
				const extensionName = path?.extname(filename ?? "");

				// const allowedExtension = [".png", ".jpg", ".jpeg"];

				// if (!allowedExtension.includes(extensionName)) {
				// 	return res.json({ message: "Invalid Image", status: false });
				// }

				const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

				const today = new Date();
				const _path = `${today.getUTCFullYear()}/${month[today.getMonth()]}/`

				fs.mkdirSync(`${publicPath}/${_path}`, { recursive: true });


				if (req?.user?.id) {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + req.user?.id + `${index}` + extensionName;
				} else {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + `${index}` + extensionName;
				}



				file.mv(`${publicPath}${_path}${filename}`);
			} catch (e) {
				return R(res, false, "File upload failed");
			}

			data.push(filename);
		};

		Array.isArray(file)
			? file.forEach((file, i) => move(file, i))
			: move(file, 0);

		return data;
	} catch (e) {
		return R(res, false, "File upload failed");
	}
};


export const uploadsendmsgFile = async (req: UserAuthRequest, res: Response) => {
	try {
		let publicPath = env.inbox_message;

		if (!req.files) {
			return R(res, false, "No file uploaded!");
		}

		const file = req.files.file;
		const data: any = [];

		const move = (image: any, i: any) => {
			const file = image;
			let filename = file?.name;
			let index = i + 1;
			try {
				const extensionName = path?.extname(filename ?? "");

				// const allowedExtension = [".png", ".jpg", ".jpeg"];

				// if (!allowedExtension.includes(extensionName)) {
				// 	return res.json({ message: "Invalid Image", status: false });
				// }

				if (req.user?.id) {
					filename =
						filename.substring(0, 3) +
						Date.now() +
						req.user?.id +
						extensionName;
				} else {
					filename =
						filename.substring(0, 10) +
						`${index}` +
						req.user?.id +
						extensionName;
				}

				file.mv(`${publicPath}${filename}`);
			} catch (e) {
				return R(res, false, "Normal File1 upload failed");
			}

			data.push(filename);
		};

		Array.isArray(file)
			? file.forEach((file, i) => move(file, i))
			: move(file, 0);

		return data;
	} catch (e) {
		return R(res, false, "Normal File1 upload failed 2");
	}
};


export const uploadProtpic = async (req: UserAuthRequest, res: Response) => {
	try {
		let publicPath = env.prot_pic;

		if (!req.files) {
			return R(res, false, "No file uploaded!");
		}

		const file = req?.files?.file2;
		const data: any = [];

		const move = (image: any, i: any) => {
			const file = image;
			let filename = file?.name;
			let index = i + 1;
			try {
				const extensionName = path?.extname(filename ?? "");

				// const allowedExtension = [".png", ".jpg", ".jpeg"];

				// if (!allowedExtension.includes(extensionName)) {
				// 	return res.json({ message: "Invalid Image", status: false });
				// }

				if (req.user?.id) {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + req.user?.id + `${index}` + extensionName;
				} else {
					filename =
						filename.substring(0, 10) +
						`${index}` +
						req.user?.id +
						extensionName;
				}

				file.mv(`${publicPath}${filename}`);
			} catch (e) {
				return R(res, false, "Machined parts image1 File upload failed");
			}

			data.push(filename);
		};

		Array.isArray(file)
			? file.map((file, i) => move(file, i))
			: move(file, 0);

		return data;
	} catch (e) {
		return R(res, false, "Machined parts image file upload failed");
	}
};

export const uploadInvoice = async (req: UserAuthRequest, res: Response) => {
    try {
        let publicPath = env.invoice;

        if (!req.files) {
            return R(res, false, "No file uploaded!");
        }

        const file = req?.files?.pdfFile;
        const data: any = [];

        const move = (image: any, i: any) => {
            const file = image;
            let filename = file?.name;
            let index = i + 1;
            try {
                const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                const today = new Date();
                const _path = `${today.getUTCFullYear()}/${month[today.getMonth()]}/`

                fs.mkdirSync(`${publicPath}/${_path}`, { recursive: true });

                file.mv(`${publicPath}${_path}${filename}`);
            } catch (e) {
                return R(res, false, "Machined parts image1 File upload failed");
            }

            data.push(filename);
        };

        Array.isArray(file)
            ? file.map((file, i) => move(file, i))
            : move(file, 0);

        return data;
    } catch (e) {
        return R(res, false, "Machined parts image file upload failed");
    }
};

export const uploadadditionalFile = async (req: UserAuthRequest, res: Response, obj: any) => {
	try {
		let publicPath = env.project;

		if (!req.files) {
			return R(res, false, "No file uploaded!");
		}

		const file = req.files.file;
		const data: any = [];

		const move = (image: any, i: any) => {
			const file = image;
			let filename = file?.name;
			let index = i + 1;
			try {
				const extensionName = path?.extname(filename ?? "");

				// const allowedExtension = [".png", ".jpg", ".jpeg"];

				// if (!allowedExtension.includes(extensionName)) {
				// 	return res.json({ message: "Invalid Image", status: false });
				// }

				// const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

				// const today = new Date();
				const _path = `${obj?.year}/${obj?.month}/`

				fs.mkdirSync(`${publicPath}/${_path}`, { recursive: true });

				if (req?.user?.id) {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + req.user?.id + `${index}` + extensionName;
				} else {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + `${index}` + extensionName;
				}


				file.mv(`${publicPath}${_path}${filename}`);
			} catch (e) {
				return R(res, false, "File upload failed");
			}

			data.push(filename);
		};

		Array.isArray(file)
			? file.forEach((file, i) => move(file, i))
			: move(file, 0);

		return data;
	} catch (e) {
		return R(res, false, "File upload failed");
	}
};


export const deleteadditionalFile = async (req: UserAuthRequest, res: Response, obj: any) => {
	const filePath = `/public/projects/${obj?.file}`;
	const absoluteFilePath = path.join(process.cwd(), filePath);

	console.log("The file is ", obj?.file)

	try {

		if (fs.existsSync(absoluteFilePath)) {
			// Attempt to delete the file or directory
			fs.unlinkSync(absoluteFilePath);

			// You can also remove the directory if it's empty
			//fs.rmdirSync(path.dirname(absoluteFilePath));

			// Respond with a success message
			return R(res, true, "File delete success");

		} else {
			//console.log("File does not exist.");
			return R(res, true, "File delete success");
		}
	} catch (e) {
		// Handle errors
		console.error("File delete failed:", e);
		return R(res, false, "File delete failed");
	}
};


export const deleteprofilepic = async (req: UserAuthRequest, res: Response, file: any) => {
	const filePath = `/public/logos/${file}`;
	const absoluteFilePath = path.join(process.cwd(), filePath);

	try {

		if (fs.existsSync(absoluteFilePath)) {
			// Attempt to delete the file or directory
			fs.unlinkSync(absoluteFilePath);

			// You can also remove the directory if it's empty
			//fs.rmdirSync(path.dirname(absoluteFilePath));

			// Respond with a success message
			return R(res, true, "File delete success");

		} else {
			//console.log("File does not exist.");
			return R(res, true, "File delete success");
		}
	} catch (e) {
		// Handle errors
		console.error("File delete failed:", e);
		return R(res, false, "File delete failed");
	}
};

export const deleteportfoliopic = async (req: UserAuthRequest, res: Response, file: any) => {
	const filePath = `/public/portfolios/${file}`;
	const absoluteFilePath = path.join(process.cwd(), filePath);

	try {

		if (fs.existsSync(absoluteFilePath)) {
			// Attempt to delete the file or directory
			fs.unlinkSync(absoluteFilePath);

			// You can also remove the directory if it's empty
			//fs.rmdirSync(path.dirname(absoluteFilePath));

			// Respond with a success message
			return R(res, true, "File delete success");

		} else {
			//console.log("File does not exist.");
			return R(res, true, "File delete success");
		}
	} catch (e) {
		// Handle errors
		console.error("File delete failed:", e);
		return R(res, false, "File delete failed");
	}
};

export const uploadbidfile = async (req: UserAuthRequest, res: Response) => {
	try {
		let publicPath = env.project;

		if (!req.files) {
			return R(res, false, "No file uploaded!");
		}

		const file = req?.files?.file;
		const data: any = [];

		const move = (image: any, i: any) => {
			const file = image;
			let filename = file?.name;
			let index = i + 1;
			try {
				const extensionName = path?.extname(filename ?? "");

				// const allowedExtension = [".png", ".jpg", ".jpeg"];

				// if (!allowedExtension.includes(extensionName)) {
				// 	return res.json({ message: "Invalid Image", status: false });
				// }

				if (req.user?.id) {
					filename = filename.substring(0, 3) + Date.now()
						.toString(36)
						.toUpperCase()
						.split("")
						.reverse()
						.join("") + req.user?.id + `${index}` + extensionName;
				} else {
					filename =
						filename.substring(0, 10) +
						`${index}` +
						req.user?.id +
						extensionName;
				}

				file.mv(`${publicPath}${filename}`);
			} catch (e) {
				return R(res, false, "Machined parts image1 File upload failed");
			}

			data.push(filename);
		};

		Array.isArray(file)
			? file.map((file, i) => move(file, i))
			: move(file, 0);

		return data;
	} catch (e) {
		return R(res, false, "Machined parts image file upload failed");
	}
};

