import { Request, Response } from "express"
import { DetailProductService } from "../../services/product/DetailProductService"

class DetailProductController {
    async handle(req: Request, res: Response) {

        const product_id = req.body

        const detailProductService = new DetailProductService()

        const product = await detailProductService.execute(product_id)

        res.json(product)
    }
}

export { DetailProductController }