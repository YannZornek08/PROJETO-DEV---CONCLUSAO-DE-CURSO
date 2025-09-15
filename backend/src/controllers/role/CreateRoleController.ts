import { Request, Response } from "express";
import { CreateRoleService } from "../../services/role/CreateRoleService"

class CreateRoleController {
    async handle(req: Request, res: Response) {

        const { name } = req.body;

        const createRoleService = new CreateRoleService();

        const role = await createRoleService.execute({
            name
        });

        res.json(role)
    }
}

export { CreateRoleController }