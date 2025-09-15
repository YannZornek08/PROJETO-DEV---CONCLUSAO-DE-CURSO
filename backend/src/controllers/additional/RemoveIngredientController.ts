import { Request, Response } from "express";
import { RemoveIngredientService } from "../../services/additional/RemoveIngredientService";

class RemoveIngredientController {
    async handle(req: Request, res: Response) {
        const { product_id, ingredient_id, adicionado } = req.body;

        const removeIngredientService = new RemoveIngredientService();

        const ingredient = await removeIngredientService.execute({
            product_id,
            ingredient_id,
            adicionado
        });

        res.json(ingredient)
    }
}

export { RemoveIngredientController }