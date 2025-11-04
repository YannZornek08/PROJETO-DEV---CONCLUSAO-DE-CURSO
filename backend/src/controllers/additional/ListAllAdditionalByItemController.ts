import { Request, Response } from "express";
import { ListAdditionalByItemService } from "../../services/additional/ListAllAdditionalByItemService";

class ListAdditionalByItemController {
    async handle(req: Request, res: Response) {
        const { item_id } = req.body // Pode vir por query ou params, dependendo da sua rota

        const listAdditionalByItemService = new ListAdditionalByItemService();

        try {
            const additionals = await listAdditionalByItemService.execute({
                item_id: item_id as string
            });

            res.json(additionals);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}

export { ListAdditionalByItemController };
