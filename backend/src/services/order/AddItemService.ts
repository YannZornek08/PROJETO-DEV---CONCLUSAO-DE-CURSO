import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    items_ingredients_id: string;
    items_additionals_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, product_id, items_ingredients_id, items_additionals_id, amount }: ItemRequest ) {

        const order = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                items_ingredients_id: items_ingredients_id,
                items_additionals_id: items_additionals_id,
                amount
            }
        })

        return order;

    }
}

export { AddItemService }