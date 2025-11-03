import prismaClient from "../../prisma";

interface ItemAdditionalRequest {
    item_additional_id: string;
    order_id: string;
}

class RemoveItemAdditionalService {
    async execute({ item_additional_id, order_id }: ItemAdditionalRequest ) {

        const itemAdditional = await prismaClient.items_additionals.delete({
            where: {
                id: item_additional_id,
                order_id: order_id
            }
        })

        return itemAdditional;

    }
}

export { RemoveItemAdditionalService }