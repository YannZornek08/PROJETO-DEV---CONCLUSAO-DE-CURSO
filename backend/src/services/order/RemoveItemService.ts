import prismaClient from "../../prisma";

interface ItemRequest {
    item_id: string;
}

class RemoveItemService {
    async execute({ item_id }: ItemRequest ) {

        const additionals = await prismaClient.items_additionals.deleteMany({
            where: {
                item_id: item_id,
            }
        });

        const ingredients =  await prismaClient.items_ingredients.deleteMany({
            where: {
                item_id: item_id,
            }
        });

        const order = await prismaClient.item.delete({
            where: {
                id: item_id,
            }
        })

        return order;

    }
}

export { RemoveItemService }