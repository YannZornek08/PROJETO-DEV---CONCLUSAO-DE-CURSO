import { Request, Response } from "express";
import { AddIngredientService } from "../../services/ingredients/RelationIngredientWithProductService";

class AddIngredientController {
    async handle(req: Request, res: Response) {
        const { ingredient_id, product_id } = req.body;

        const addIngredientService = new AddIngredientService();

        const ingredient = await addIngredientService.execute({
            ingredient_id,
            product_id
        });

        res.json(ingredient);
    }
}

export { AddIngredientController }