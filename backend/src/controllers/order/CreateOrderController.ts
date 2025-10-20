import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import prismaClient from "../../prisma";

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { table_id, costumer_id } = req.body;

        if (!table_id || !costumer_id) {
            return res.status(400).json({ error: 'table_id and costumer_id are required' });
        }

        console.log('[CreateOrderController] received create order request:', { table_id, costumer_id });

        try {
            
            let table = await prismaClient.table.findUnique({ where: { id: table_id } });

         
            if (!table) {
                const maybeNumber = Number(table_id);
                if (!Number.isNaN(maybeNumber)) {
                    table = await prismaClient.table.findFirst({ where: { number: maybeNumber } });
                    if (table) {
                        console.log('[CreateOrderController] resolved table by number -> id:', table.id);
                        // replace table_id with actual id for order creation
                        // @ts-ignore
                        table_id = table.id;
                    }
                }
            }

            if (!table) return res.status(404).json({ error: 'Table not found' });

            const costumer = await prismaClient.costumer.findUnique({ where: { id: costumer_id } });
            if (!costumer) return res.status(404).json({ error: 'Costumer not found' });

            const createOrderService = new CreateOrderService();
            const order = await createOrderService.execute({ table_id, costumer_id });
            return res.json(order);
        } catch (err: any) {
            console.error('[CreateOrderController] error creating order:', err.message || err);
            return res.status(500).json({ error: 'Erro ao criar order', details: err.message || err });
        }
    }
}

export { CreateOrderController };
