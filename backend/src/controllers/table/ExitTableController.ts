import { Request, Response } from "express";
import { ExitTableService } from "../../services/table/ExitTableService";

class ExitTableController {
    async handle (req: Request, res: Response) {
        const { table_id } = req.body;

        const exitTableService = new ExitTableService();

        const table = await exitTableService.execute({
            table_id
        });
        
        res.json(table)
    }
}

export { ExitTableController }