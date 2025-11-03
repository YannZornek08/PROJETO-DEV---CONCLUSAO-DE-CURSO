import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class SendOrderService {
    async execute({ order_id }: OrderRequest ) {

        try {
            const order = await prismaClient.order.update({
                where: { id: order_id },
                data: { draft: false }
            });
            return order;
        } catch (err: any) {
            console.error('[SendOrderService] failed to update order draft:', err.message || err);
            throw new Error('Não foi possível fechar a comanda');
        }

    }
}

export { SendOrderService }