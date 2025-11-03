import { Request, Response } from "express";
import { ListTablesService } from "../../services/table/ListTablesService";

class ListTablesController {
    async handle(req: Request, res: Response) {
        const listTableService = new ListTablesService();

        const tables = await listTableService.execute();

        res.json(tables)
    }
}

export { ListTablesController }