import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

// No seu backend, adicione uma verificação:
class DetailOrderService {
    async execute({ order_id }: DetailRequest ) {
        
        // Verifica se o pedido existe
        const orderExists = await prismaClient.order.findUnique({
            where: { id: order_id },
            select: { draft: true }
        });

        if (!orderExists) {
            throw new Error("Pedido não encontrado");
        }

        const orders = await prismaClient.order.findFirst({
            where: {
                id: order_id
            },
            select: {
                id: true,
                draft: true
            } 
        })

        const items = await prismaClient.item.findMany({
            where: { 
                order_id: order_id 
            },
            include: { 
                product: true, 
                order: true
            }
        });

        return { items, orders } ;
    }
}

export { DetailOrderService }