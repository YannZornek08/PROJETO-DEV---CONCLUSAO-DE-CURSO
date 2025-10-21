import { Request, Response } from "express";
import { RemoveItemAdditionalService } from "../../services/additional/RemoveItemAdditionalService";

class RemoveItemAdditionalController {
    async handle(req: Request, res: Response) {
        const { item_additional_id, order_id } = req.body;

        const removeItemAdditionalService = new RemoveItemAdditionalService();

        try {
            const result = await removeItemAdditionalService.execute({ 
                item_additional_id, 
                order_id 
            });
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}

export { RemoveItemAdditionalController };
