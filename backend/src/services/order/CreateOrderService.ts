import prismaClient from "../../prisma";

interface OrderRequest {
    table_id: string;
    costumer_id: string;
}

class CreateOrderService {
    async execute({ table_id, costumer_id }: OrderRequest ) {
        const order = await prismaClient.order.create({
            data: {
                table_id,
                costumer_id,
            }
        });

        return order;
    }
}

export { CreateOrderService };
