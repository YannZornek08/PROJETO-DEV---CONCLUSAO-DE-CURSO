import { Request, Response } from "express";
import { UpdateAdditionalService } from "../../services/additional/UpdateAdditionalService"

class UpdateAdditionalController {
    async handle(req: Request, res: Response) {
        try {
            const { ingredient_id, product_id } = req.body;

            if (!ingredient_id || !product_id) {
                res.status(400).json({ error: "ingredient_id e product_id são obrigatórios." });
            }

            const updateAdditional = new UpdateAdditionalService();

            const additional = await updateAdditional.execute({
                ingredient_id,
                product_id
            });

            res.json(additional);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateAdditionalController }