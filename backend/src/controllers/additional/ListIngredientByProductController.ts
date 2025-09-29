import { Request, Response } from "express";
import { ListIngredientByCategoryService } from "../../services/additional/ListIngredientByProductService";

class ListIngredientByProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const listIngredientByProduct = new ListIngredientByCategoryService();

        const ingredients = await listIngredientByProduct.execute({
            product_id
        });

        res.json(ingredients);
    }
}

export { ListIngredientByProductController }