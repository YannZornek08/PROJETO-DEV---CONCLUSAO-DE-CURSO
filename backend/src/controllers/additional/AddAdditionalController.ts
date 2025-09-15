import { Request, Response } from "express";
import { AddAdditionalService } from "../../services/additional/AddAdditionalService";

class AddAdditionalController {
    async handle(req: Request, res: Response) {
        const { ingredient_id, product_id } = req.body;

        const addAdditionalService = new AddAdditionalService();

        const additional = await addAdditionalService.execute({
            ingredient_id,
            product_id
        });

        res.json(additional);
    }
}

export { AddAdditionalController }