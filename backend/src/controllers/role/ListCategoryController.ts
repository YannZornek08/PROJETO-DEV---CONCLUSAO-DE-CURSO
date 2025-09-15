import { Request, Response } from "express";
import { ListRoleService } from "../../services/role/ListRoleService"

class ListRoleController {
    async handle(req: Request, res: Response) {

        const listRoleService = new ListRoleService();

        const role = await listRoleService.execute();

        res.json(role);

    }
}

export { ListRoleController }