import { Request, Response } from "express";
import { CreateAdditionalService } from "../../services/additional/CreateAdditionalService";

class CreateAdditionalController {
    async handle(req: Request, res: Response) {
        const { name, price } = req.body;

        const createAdditionalService = new CreateAdditionalService()

        const additional = await createAdditionalService.execute({
            name,
            price
        });

        res.json(additional)
    }
}

export { CreateAdditionalController }