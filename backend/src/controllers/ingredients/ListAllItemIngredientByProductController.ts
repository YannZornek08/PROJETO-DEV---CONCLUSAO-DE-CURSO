import { Request, Response } from "express";
import { ListAllItemIngredientByProductService } from "../../services/ingredients/ListAllItemIngredientByProductService";

class ListAllItemIngredientByProductController {
  async handle(req: Request, res: Response) {
    const { product_id, order_id } = req.query as { product_id: string; order_id: string };
    // ou use req.params.product_id / req.params.order_id se a rota for /:product_id/:order_id

    const listAllItemIngredientByProductService = new ListAllItemIngredientByProductService();

    try {
      const result = await listAllItemIngredientByProductService.execute({
        product_id,
        order_id,
      });

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { ListAllItemIngredientByProductController };
