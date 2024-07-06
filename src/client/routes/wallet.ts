import express, { Request, Response } from "express";
import cn from "@client/controller/wallet";
import upload from "express-fileupload";

const router = express.Router();

router.get("/test", cn.test);

router.post("/create-order", cn.create_order);

router.post("/pay-machinist", cn.pay_machinist);
router.post("/paypal-transaction-complete", cn.paypal_transaction_complete);


/*FILE UPLOAD APIs */
router.use(upload());

export default router;
