import { Request, Response } from "express";
import { AddAdditionalService} from "../../services/additional/RelationAdditionalWithCategoryService"

class AddAdditionalController {
    async handle(req: Request, res: Response) {
        const { additional_id, category_id } = req.body;

        const addAdditionalService = new AddAdditionalService();

        const Additional = await addAdditionalService.execute({
            additional_id,
            category_id
        });

        res.json(Additional);
    }
}

export { AddAdditionalController }