import { Request, Response } from "express";
import { RemovingAdditionalService } from "../../services/additional/RemovingAdditionalService"

class RemovingAdditionalController {
    async handle (req: Request, res: Response) {
        const { ingredient_id, product_id } = req.body;

        const removingAdditional = new RemovingAdditionalService();

        const additional = await removingAdditional.execute({
            ingredient_id,
            product_id
        });
        
        res.json(additional)
    }
}

export { RemovingAdditionalController }