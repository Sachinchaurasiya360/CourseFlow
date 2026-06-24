import { paymentService } from "./payment.service.js";
export class PaymentController{
    constructor (private readonly paymentService:paymentService){}

    async handlepayment(req:Request,res:Response){
        
    }
}