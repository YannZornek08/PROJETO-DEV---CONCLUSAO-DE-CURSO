import { Request, Response } from "express";
import { ItemAdditionalService } from "../../services/additional/ItemAdditionalService";

class ItemAdditionalController {
    async handle(req: Request, res: Response) {
        const { categories_additionals_id, order_id} = req.body;

        const itemAdditionalService = new ItemAdditionalService()

        const additional = await itemAdditionalService.execute({
           categories_additionals_id,
           order_id
        });

        res.json(additional)
    }
}

export {ItemAdditionalController }