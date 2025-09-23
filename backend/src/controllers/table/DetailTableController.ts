import { Request, Response } from "express";
import { DetailTableService } from "../../services/table/DetailTableService";

class DetailTableController {
    async handle(req: Request, res: Response) {
        const table_id = req.query.table_id as string;

        const detailTableService = new DetailTableService();

        const table = await detailTableService.execute({
            table_id
        });

        res.json(table);
    }
}

export { DetailTableController }