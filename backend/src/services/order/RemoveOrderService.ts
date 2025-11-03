import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class RemoveOrderService {
    async execute({ order_id }: OrderRequest) {

        try {
            // Delete payments and items first to avoid foreign key constraint errors
            const deletePayments = prismaClient.payment.deleteMany({ where: { order_id } });
            const deleteItems = prismaClient.item.deleteMany({ where: { order_id } });
            const deleteOrder = prismaClient.order.delete({ where: { id: order_id } });

            const [_, __, order] = await prismaClient.$transaction([
                deletePayments,
                deleteItems,
                deleteOrder,
            ]);

            return order;
        } catch (err: any) {
            console.error('[RemoveOrderService] failed to remove order:', err.message || err);
            throw new Error('Não foi possível excluir a comanda');
        }

    }
}

export { RemoveOrderService }