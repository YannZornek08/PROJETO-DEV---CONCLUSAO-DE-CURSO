import { Request, Response } from "express";
import { ItemIngredientService } from "../../services/ingredients/ItemIngredientService";

class ItemIngredientController {
    async handle(req: Request, res: Response) {
    const { ingredient_product_id, order_id, item_id } = req.body;

        const itemIngredient = new ItemIngredientService();

        const ingredient = await itemIngredient.execute({
            ingredient_product_id,
            order_id,
            item_id,
        });

        res.json(ingredient)
    }
}

export { ItemIngredientController }