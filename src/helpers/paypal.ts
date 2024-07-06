import models from "@model/index";
import { payments } from "@model/payments";
import { Request, Response } from "express";
import paypal from "paypal-rest-sdk";

export async function pay(){
    const paypal = await models.settings.findOne({
        where:{

            
        }
    })    



    
}





