import { Request, Response } from "express";
import { AllItemIngredientService } from "../../services/ingredients/AllItemIngredientService";

class AllItemIngredientController {
  async handle(req: Request, res: Response) {
    const { product_id, order_id } = req.body; // ou req.params.product_id se a rota for /:product_id

    const allItemIngredientService = new AllItemIngredientService();

    try {
      const result = await allItemIngredientService.execute({ product_id}, { order_id });
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { AllItemIngredientController };
