import { Request, Response } from "express";
import { RemoveItemAdditionalService } from "../../services/additional/RemoveItemAdditionalService";

class RemoveItemAdditionalController {
    async handle(req: Request, res: Response) {
        const item_additionals_id = req.query.item_additionals_id as string;

        const removeItemadditionalService = new RemoveItemAdditionalService();

        const item_additional = await removeItemadditionalService.execute({
            item_additionals_id
        });

        res.json(item_additional)
    }
}

export { RemoveItemAdditionalController }