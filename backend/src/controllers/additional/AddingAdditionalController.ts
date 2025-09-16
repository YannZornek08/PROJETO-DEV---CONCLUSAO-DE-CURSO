import { Request, Response } from "express";
import { AddingAdditionalService } from "../../services/additional/AddingAdditionalService"

class AddingAdditionalController {
    async handle (req: Request, res: Response) {
        const { ingredient_id, product_id } = req.body;

        const addingAdditional = new AddingAdditionalService();

        const additional = await addingAdditional.execute({
            ingredient_id,
            product_id
        });
        
        res.json(additional)
    }
}

export { AddingAdditionalController }