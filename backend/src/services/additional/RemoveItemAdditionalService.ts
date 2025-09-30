import prismaClient from "../../prisma";

interface ItemAdditionalRequest {
    item_additionals_id: string;
}

class RemoveItemAdditionalService {
    async execute({ item_additionals_id }: ItemAdditionalRequest ) {

        const ItemAdditional = await prismaClient.items_additionals.delete({
            where: {
                id: item_additionals_id,
            }
        })

        return ItemAdditional;

    }
}

export { RemoveItemAdditionalService }