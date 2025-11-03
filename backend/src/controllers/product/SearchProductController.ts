import { Request, Response } from "express";
import { SearchProductService } from "../../services/product/SearchProductService";

class SearchProductController {
  async handle(req: Request, res: Response) {
    const { name } = req.query; // pegando o termo da barra de pesquisa (query params)

    const searchProductService = new SearchProductService();

    const products = await searchProductService.execute({
      name: String(name) // garante que o name é string
    });

    res.json(products);
  }
}

export { SearchProductController };
