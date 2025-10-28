import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
    note: string;
}

class AddItemService {
    async execute({ order_id, product_id, amount, note }: ItemRequest ) {

        const item = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount,
                // note may not exist on item model in Prisma; include if present in DB
                ...(note ? { note } : {}),
            },
            include: {
                product: true,
            }
        })

        return item;

    }
}

export { AddItemService }