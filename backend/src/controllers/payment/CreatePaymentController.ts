import { Request, Response } from "express";
import { CreatePaymentService } from "../../services/payment/CreatePaymentService";

class CreatePaymentController {
    async handle(req: Request, res: Response) {

        const { order_id, table_id, mtdo_pagto_id } = req.body;

        const createPaymentService = new CreatePaymentService();

        const payment = await createPaymentService.execute({
            mtdo_pagto_id,
            order_id,
            table_id
        });

        res.json(payment)
    }
}

export { CreatePaymentController }