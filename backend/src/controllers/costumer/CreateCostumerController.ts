import { Request, Response } from 'express'
import { CreateCostumerService } from '../../services/costumer/CreateCostumerService'

class CreateCostumerController {
    async handle(req: Request, res: Response) {
        const { name, email, password, dt_nasc } = req.body

        const createCostumerService = new CreateCostumerService();

        const costumer = await createCostumerService.execute({
            name,
            email,
            password,
            dt_nasc
        });

        res.json({costumer})
    }
}

export {CreateCostumerController}