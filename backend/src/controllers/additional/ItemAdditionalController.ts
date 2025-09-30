import { Request, Response } from "express";
import { ItemAdditionalService } from "../../services/additional/ItemAdditionalService";

class ItemAdditionalController {
    async handle(req: Request, res: Response) {
        const { categories_additionals_id, adicionado } = req.body;

        const ItemAdditional = new ItemAdditionalService();

        const additional = await ItemAdditional.execute({
            categories_additionals_id,
            adicionado
        });

        res.json(additional)
    }
}

export { ItemAdditionalController }