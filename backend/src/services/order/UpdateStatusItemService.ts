import prismaClient from "../../prisma";

type ItemStatusRequest = {
    item_id: string;
    status: number;
};

/**
 * Service para atualizar o campo `status` da tabela `item`.
 * Valores permitidos: 0, 1, 2, 3
 */
export default class UpdateStatusItemService {
    async execute({ item_id, status }: ItemStatusRequest) {
        const allowedStatuses = [0, 1, 2, 3];
        if (!allowedStatuses.includes(status)) {
            throw new Error('Status inválido. Valores permitidos: 0, 1, 2, 3.');
        }

        // Verifica se o item existe e pega o order_id
        const item = await prismaClient.item.findUnique({
            where: { id: item_id },
            select: { id: true, order_id: true }
        });

        if (!item) {
            throw new Error("Item não encontrado");
        }

        // Atualiza o status do item
        const updatedItem = await prismaClient.item.update({
            where: { id: item_id },
            data: { status },
            select: { id: true, status: true, order_id: true }
        });

        // Se todos os items do pedido estiverem com status 3 (ENTREGUE), atualiza o pedido
        const orderItems = await prismaClient.item.findMany({
            where: { order_id: updatedItem.order_id },
            select: { status: true }
        });

        const allDelivered = orderItems.length > 0 && orderItems.every(i => i.status === 3);

        if (allDelivered) {
            // atualiza order.status (no schema é Boolean)
            await prismaClient.order.update({
                where: { id: updatedItem.order_id },
                data: { status: true }
            });
        }

        return { ...updatedItem, orderAllDelivered: allDelivered };
    }
}

export { UpdateStatusItemService };
