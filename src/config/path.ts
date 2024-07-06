import dotenv from "dotenv";
dotenv.config();

export default {
	// paths
	project: process.cwd() + "/public/projects/",
	inbox_message: process.cwd() + "/public/message_attach/",
  	update_profile_picture: process.cwd() + "/public/logos/",
 	prot_pic: process.cwd() + "/public/portfolios/",
	invoice: process.cwd() + "/public/pdf_generation/",
	
};
