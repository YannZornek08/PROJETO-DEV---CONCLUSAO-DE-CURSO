import { Request, Response } from "express";
import { ListPaymentService } from "../../services/payment/ListPaymentsService"

class ListPaymentsController {
    async handle(req: Request, res: Response) {

        const listPaymentsService = new ListPaymentService();

        const payments = await listPaymentsService.execute();

        res.json(payments);

    }
}

export { ListPaymentsController }