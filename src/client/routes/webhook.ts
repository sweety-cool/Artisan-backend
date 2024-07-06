import express, { Request, Response, NextFunction } from "express";
import cn from "@client/controller/project";
import upload from "express-fileupload";
import bodyParser from "body-parser";
import rawBody from "raw-body";
import { asyncWrapper, R } from "@helpers/response-helpers";

const router = express.Router();

import Stripe from "stripe";


const stripe = new Stripe('sk_test_51P10WjSI5JkjOQYeRJzK1Jf8ZRSwvLKIU63oD7qQKL10vqYWIM2WLUsHUYkiWiY5j5wmPF7FVVwomeICaTUzirQ300yJv1rB05', {
    apiVersion: '2023-10-16',
});




// router.use(bodyParser.json({
//     verify: (req: Request, res: Response, buf: Buffer, encoding: string) => {
//         (req as any).rawBody = buf.toString(); // Storing raw body in req.rawBody
//     }
// }));

router.use(bodyParser.json());


router.post('/deposit-fund', (request, response) => {

    const rawBody: string = (request as any).rawBody;
    console.log('Raw body:', rawBody);

    // Add your logic here to verify the webhook signature for security
    const sig = request.headers['stripe-signature'] ? request.headers['stripe-signature'] : "";
    const stripeWebhookSecret = 'whsec_YZ6uBIMzZva46csb98RcvkEt6HmGBgWw';

    let event;

    try {
        // Construct the event using raw body and signature
        const event = stripe.webhooks.constructEvent(request.body, sig, stripeWebhookSecret);

        console.log("the event is: -", event)

        // Send a 200 OK response to acknowledge receipt of the event
        response.json({ received: true });
    } catch (err) {
        console.error('Error verifying webhook signature:', err);
        response.status(400).send(`Webhook Error: ${err}`);
    }
});

export default router;
