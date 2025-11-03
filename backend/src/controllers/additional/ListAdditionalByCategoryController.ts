import { Request, Response } from "express";
import { ListAdditionalByCategoryService } from "../../services/additional/ListAdditionalByCategoryService";

class ListAdditionalByCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;

        const listAdditionalByCategory = new ListAdditionalByCategoryService();

        const additional = await listAdditionalByCategory.execute({
            category_id
        });

        res.json(additional);
    }
}

export { ListAdditionalByCategoryController }