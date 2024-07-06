import express from "express";
import figlet from "figlet";
import { errorHandler } from "../middleware/errorHanlder";
import cors from "cors";
import verifyUser from "@middleware/auth";
import env from "@config/env";
import routes from "./routes";
import morgan from "@middleware/morgan";


const app = express();

//cors

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  	res.setHeader('Pragma', 'no-cache');
  	res.setHeader('Expires', 'Fri 05 Jan 2090 00:00:00 GMT');
	next();
});

app.use(cors({ origin: "*" }));



app.use(express.json());

// authentication
app.use(verifyUser);

// static routes
app.use(routes._public);

//logger
app.use(morgan);

app.use("/user/auth", routes.auth);
app.use("/user/project", routes.project);
app.use("/user/wallet", routes.wallet);
app.use("/user/upload", routes.upload);
app.use("/user/webhook", routes.webhook);

app.use(errorHandler);

app.listen(env.port, () => {
	figlet.text(
		"Harsh . js",
		{
			font: "Big",
		},
		function (err, data) {
			if (err) {
				console.log("Something went wrong...");
				console.dir(err);
				return;
			}

			console.log(data);
			console.log(`Listening 🤙 On PORT ${env.port} 🚀`);
		},
	);
});
