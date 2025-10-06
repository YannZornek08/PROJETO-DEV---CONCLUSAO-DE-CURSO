import { Request, Response } from "express";
import { AllItemAdditionalService } from "../../services/additional/AllItemAdditionalService";

class AllItemAdditionalController {
  async handle(req: Request, res: Response) {
    const { category_id } = req.body; // ou req.params.product_id se a rota for /:product_id

    const allItemAdditionalService = new AllItemAdditionalService();

    try {
      const result = await allItemAdditionalService.execute({ category_id });
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { AllItemAdditionalController };
