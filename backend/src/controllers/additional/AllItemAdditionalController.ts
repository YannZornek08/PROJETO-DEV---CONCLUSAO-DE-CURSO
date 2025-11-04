import { Request, Response } from "express";
import { AllItemAdditionalService } from "../../services/additional/AllItemAdditionalService";

class AllItemAdditionalController {
  async handle(req: Request, res: Response) {
  const { category_id, order_id, item_id } = req.body; // item_id now required to create per-item adicionais

    const allItemAdditionalService = new AllItemAdditionalService();

    try {
  const result = await allItemAdditionalService.execute({ category_id }, { order_id, item_id });
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { AllItemAdditionalController };
