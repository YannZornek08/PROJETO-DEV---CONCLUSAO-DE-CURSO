import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    items_ingredients_id: string;
    items_additionals_id: string;
    amount: number;
    note: string;
}

class AddItemService {
    async execute({ order_id, product_id, items_ingredients_id, items_additionals_id, amount, note }: ItemRequest ) {

        const item = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                // items_ingredients_id and items_additionals_id are relations (lists) and
                // should not be set directly when creating the Item. Ingredients/additionals
                // are managed via their own services (create/remove items_ingredients/items_additionals).
                amount,
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