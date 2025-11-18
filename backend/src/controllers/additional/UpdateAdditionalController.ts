import { Request, Response } from "express";
import { UpdateAdditionalService } from "../../services/additional/UpdateAdditionalService"

class UpdateAdditionalController {
    async handle(req: Request, res: Response) {
        try {
            const { categories_additionals_id, order_id, item_id } = req.body;

            if (!categories_additionals_id || !item_id) {
                res.status(400).json({ error: "categories_additionals_id e item_id são obrigatórios." });
                return;
            }

            const updateAdditional = new UpdateAdditionalService();

            const additional = await updateAdditional.execute({
                categories_additionals_id,
                order_id,
                item_id,
            });

            res.json(additional);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateAdditionalController }