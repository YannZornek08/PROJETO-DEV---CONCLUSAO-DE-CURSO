import prismaClient from "../../prisma";

interface OrderRequest {
    table_id: string;
    costumer_id: string;
}

class CreateOrderService {
    async execute({ table_id, costumer_id }: OrderRequest) {
        try {
            const order = await prismaClient.order.create({
                data: {
                    table_id,
                    costumer_id,
                },
                select: {
                    id: true,
                    table_id: true,
                    costumer_id: true,
                    draft: true,
                    status: true,
                    table: true,
                },
            });

            return order;
        } catch (err: any) {
            console.error('[CreateOrderService] failed to create order:', err.message || err);
            throw new Error('Erro ao criar order: ' + (err.message || err));
        }
    }
}

export { CreateOrderService };
