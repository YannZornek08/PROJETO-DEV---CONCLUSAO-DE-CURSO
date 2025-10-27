import { Request, Response } from "express";
import { SearchProductService } from "../../services/product/SearchProductService";

class SearchProductController {
  async handle(req: Request, res: Response) {
    const name = req.query.name as string;
    const searchProductService = new SearchProductService();

    try {
      const products = await searchProductService.execute(name);
      return res.json(products);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  }
}

export { SearchProductController };
