import { Request, Response } from "express";
import { AddIngredientService } from "../../services/additional/AddIngredientService";

class AddIngredientController {
    async handle(req: Request, res: Response) {
        const { product_id, ingredient_id, adicionado } = req.body;

        const addIngredientService = new AddIngredientService();

        const ingredient = await addIngredientService.execute({
            product_id,
            ingredient_id,
            adicionado
        });

        res.json(ingredient)
    }
}

export { AddIngredientController }