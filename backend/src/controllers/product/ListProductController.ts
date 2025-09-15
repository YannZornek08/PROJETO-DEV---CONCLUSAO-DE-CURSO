import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService"

class ListProductController {
    async handle(req: Request, res: Response) {

        const listProductService = new ListProductService();

        const category = await listProductService.execute();

        res.json(category);

    }
}

export { ListProductController }