import { Request, Response } from "express";
import { ListOrderByCostumerService } from "../../services/order/ListOrderByCostumerService";

class ListOrderByCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const costumer_id = req.query.costumer_id as string;

      if (!costumer_id) {
        return res.status(400).json({ error: "Costumer ID is required" });
      }

      const listOrderByCostumerService = new ListOrderByCostumerService();
      const orders = await listOrderByCostumerService.execute({ costumer_id });

      return res.json(orders);

    } catch (err: any) {
      console.error("Erro ao listar pedidos do cliente:", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  }
}

export { ListOrderByCostumerController };
