import { Request, Response } from "express";
import { TakeTableService } from "../../services/table/TakeTableService";

class TakeTableController {
    async handle (req: Request, res: Response) {
        const { table_id } = req.body;

        const takeTableService = new TakeTableService();

        const table = await takeTableService.execute({
            table_id
        });
        
        res.json(table)
    }
}

export { TakeTableController }