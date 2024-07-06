import express, { Request, Response } from "express";
import upload, { UploadedFile } from "express-fileupload";
import cn from "@client/controller/upload";

const router = express.Router();

router.use(upload());

router.post("/test", cn.test);

export default router;
