import { Request, Response } from 'express';
import { ListAllItemIngredientByProductService } from '../../services/ingredients/ListAllIngredientsByProductService';

class ListAllIngredientsByProductController {
    async handle(req: Request, res: Response) {
        const { product_id, order_id, item_id } = req.query as { product_id: string, order_id: string, item_id: string };


        const listIngredients = new ListAllItemIngredientByProductService();
        try {
            const result = await listIngredients.execute({
                product_id,
                order_id,
                item_id,
            });
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}

export { ListAllIngredientsByProductController }