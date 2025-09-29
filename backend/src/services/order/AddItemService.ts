import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    ingredient_product_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, ingredient_product_id, amount }: ItemRequest ) {

        const order = await prismaClient.item.create({
            data: {
                order_id: order_id,
                ingredient_product_id: ingredient_product_id,
                amount
            }
        })

        return order;

    }
}

export { AddItemService }