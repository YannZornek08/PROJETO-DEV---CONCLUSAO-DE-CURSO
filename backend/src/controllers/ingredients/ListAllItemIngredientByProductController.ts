import { Request, Response } from "express";
import { ListAllItemIngredientByProductService } from "../../services/ingredients/ListAllItemIngredientByProductService";

class ListAllItemIngredientByProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const listAllItemIngredientByProduct = new ListAllItemIngredientByProductService();

        const ingredients = await listAllItemIngredientByProduct.execute({
            product_id
        });

        res.json(ingredients);
    }
}

export { ListAllItemIngredientByProductController }