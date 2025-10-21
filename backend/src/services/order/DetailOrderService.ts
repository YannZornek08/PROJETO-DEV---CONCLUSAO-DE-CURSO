import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}


class DetailOrderService {
    async execute({ order_id }: DetailRequest ) {
        
        
        const orderExists = await prismaClient.order.findUnique({
            where: { id: order_id },
            select: { draft: true }
        });

        if (!orderExists) {
            throw new Error("Pedido não encontrado");
        }

        const orders = await prismaClient.order.findFirst({
            where: { id: order_id },
            select: {
                id: true,
                draft: true,
                status: true,
                table_id: true,
                costumer_id: true,
            },
        });

        const items = await prismaClient.item.findMany({
            where: { 
                order_id: order_id 
            },
            include: { 
                product: true, 
            }
        });

    
    return { ...orders, items } ;
    }
}

export { DetailOrderService }