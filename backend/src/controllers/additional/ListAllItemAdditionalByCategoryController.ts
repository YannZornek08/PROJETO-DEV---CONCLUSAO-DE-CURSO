import { Request, Response } from 'express';
import { ListAllItemAdditionalByCategoryService } from '../../services/additional/ListAllItemAdditionalByCategoryService';

class ListAllItemAdditionalByCategoryController {
    async handle(req: Request, res: Response) {
        const { category_id, order_id, item_id } = req.query as { category_id: string, order_id: string, item_id: string };

        const listAllItemAdditionalByCategoryService = new ListAllItemAdditionalByCategoryService();

        try {
            const result = await listAllItemAdditionalByCategoryService.execute({
                category_id,
                order_id
            });
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}

export { ListAllItemAdditionalByCategoryController };
