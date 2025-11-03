import { Request, Response } from "express";
import { CreateIngredientService } from "../../services/ingredients/CreateIngredientService";

class CreateIngredientController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const createIngredientService = new CreateIngredientService()

        const ingredient = await createIngredientService.execute({
            name
        });

        res.json(ingredient)
    }
}

export { CreateIngredientController }
