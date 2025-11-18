import { Request, Response } from "express";
import { UpdateItemAmountService } from "../../services/order/UpdateItemAmountService";

class UpdateItemAmountController {
    async handle(req: Request, res: Response) {
        const { item_id, action } = req.body;

        const updateItemAmountService = new UpdateItemAmountService();

        try {
            const item = await updateItemAmountService.execute({ item_id, action });
            res.json(item);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateItemAmountController };
