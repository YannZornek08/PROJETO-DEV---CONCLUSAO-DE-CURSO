import { Request, Response } from "express"
import { DetailCostumerService } from "../../services/costumer/DetailCostumerService"

class DetailCostumerController {
    async handle(req: Request, res: Response) {
        const costumer_id = req.query.costumer_id as string

        const detailCostumerService = new DetailCostumerService()

        const costumer = await detailCostumerService.execute(costumer_id)

        res.json(costumer)
    }
}

export { DetailCostumerController }