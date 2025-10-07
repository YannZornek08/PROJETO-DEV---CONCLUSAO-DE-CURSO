import { Request, Response } from "express";
import { RemoveItemIngredientService } from "../../services/ingredients/RemoveItemIngredientService";

class RemoveItemIngredientController {
    async handle(req: Request, res: Response) {
        const item_ingredient_id = req.query.item_ingredient_id as string;
        const order_id = req.query.order_id as string;

        const removeItemIngredientService = new RemoveItemIngredientService();

        const item_ingredient = await removeItemIngredientService.execute({
            item_ingredient_id,
            order_id
        });

        res.json(item_ingredient)
    }
}

export { RemoveItemIngredientController }