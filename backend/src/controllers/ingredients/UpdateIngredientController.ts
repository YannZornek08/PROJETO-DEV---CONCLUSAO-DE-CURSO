import { Request, Response } from "express";
import { UpdateIngredientService } from "../../services/ingredients/UpdateIngredientService";

class UpdateIngredientController {
    async handle(req: Request, res: Response) {
        try {
            const { ingredient_product_id } = req.body;

            if (!ingredient_product_id) {
                res.status(400).json({ error: "ingredient_product_id são obrigatórios." });
            }

            const updateIngredient = new UpdateIngredientService();

            const ingredient = await updateIngredient.execute({
                ingredient_product_id
            });

            res.json(ingredient);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateIngredientController }