import prismaClient from "../../prisma";

interface OrderRequest {
    costumer_id: string;
}

class ListOrderByCostumerService {
    async execute({ costumer_id }: OrderRequest) {

        const orders = await prismaClient.order.findMany({
            where: {
                costumer_id: costumer_id,
            },
            select: {
                id: true,
                table: true,
                status: true,
                draft: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await prismaClient.item.findMany({
                    where: { order_id: order.id },
                    select: {
                        id: true,
                        amount: true,
                        product: {
                            select: {
                                name: true,
                                banner: true,
                                price: true,
                            }
                        },
                    }
                });

                return { ...order, items };
            })
        );

        return ordersWithItems;
    }
}

export { ListOrderByCostumerService };