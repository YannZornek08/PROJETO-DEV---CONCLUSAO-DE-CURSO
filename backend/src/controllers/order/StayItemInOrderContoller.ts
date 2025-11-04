import { Request, Response } from "express";
import { StayItemInOrderService } from "../../services/order/StayItemInOrder";

class StayItemInOrderController {
    async handle(req: Request, res: Response) {
        const { item_id } = req.body;

        const stayItemInOrderService = new StayItemInOrderService();

        try {
            const item = await stayItemInOrderService.execute({ item_id });
            res.json(item);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}

export { StayItemInOrderController };
