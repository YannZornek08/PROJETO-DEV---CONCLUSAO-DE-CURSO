import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";

class RemoveOrderController {
    async handle(req: Request, res: Response) {
        const order_id = req.query.order_id as string;

        const removeOrder = new RemoveOrderService();

        try {
            const order = await removeOrder.execute({ order_id });
            res.json(order);
        } catch (err: any) {
            console.error('[RemoveOrderController] error:', err.message || err);
            res.status(400).json({ error: err.message || 'Erro ao excluir comanda' });
        }
    }
}

export { RemoveOrderController }