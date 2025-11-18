import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body;
        console.log('[SendOrderController] request to close order:', order_id);
        const sendOrder = new SendOrderService();
        try {
            const order = await sendOrder.execute({ order_id });
            console.log('[SendOrderController] order updated:', order.id, 'draft:', order.draft);
            res.json(order);
        } catch (err: any) {
            console.error('[SendOrderController] error closing order:', err.message || err);
            res.status(500).json({ error: 'Erro ao fechar a comanda', details: err.message || err });
        }
    }
}

export { SendOrderController }