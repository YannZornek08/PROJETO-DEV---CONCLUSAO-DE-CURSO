import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { table_id, costumer_id } = req.body;

        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({
            table_id,
            costumer_id
        });

        return res.json(order);
    }
}

export { CreateOrderController };
