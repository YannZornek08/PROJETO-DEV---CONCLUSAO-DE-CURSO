import { Request, Response } from "express";
import { ListOrderByCostumerService } from "../../services/order/ListOrderByCostumerService";

class ListOrderByCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const costumer_id = req.query.costumer_id as string;

      if (!costumer_id) {
        res.status(400).json({ error: "Costumer ID is required" });
      }

      const listOrderByCostumerService = new ListOrderByCostumerService();
      const orders = await listOrderByCostumerService.execute({ costumer_id });

      res.json(orders);

    } catch (err: any) {
      console.error("Erro ao listar pedidos do cliente:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }
}

export { ListOrderByCostumerController };
