import { Request, Response } from "express";
import { ItemIngredientService } from "../../services/ingredients/ItemIngredientService";

class ItemIngredientController {
    async handle(req: Request, res: Response) {
        const { ingredient_product_id, order_id } = req.body;

        const ItemIngredient = new ItemIngredientService();

        const ingredient = await ItemIngredient.execute({
            ingredient_product_id,
            order_id
        });

        res.json(ingredient)
    }
}

export { ItemIngredientController }