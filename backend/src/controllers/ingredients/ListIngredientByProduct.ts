import { Request, Response } from "express";
import { ListIngredientByProductService } from "../../services/ingredients/ListIngredientByProductService";

class ListIngredientByProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const listIngredientByProduct = new ListIngredientByProductService();

        const ingredient = await listIngredientByProduct.execute({
            product_id
        });

        res.json(ingredient);
    }
}

export { ListIngredientByProductController }