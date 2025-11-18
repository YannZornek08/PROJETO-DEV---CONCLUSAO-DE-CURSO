import prismaClient from "../../prisma";

interface ItemAdditionalRequest {
    item_additional_id: string;
    order_id: string;
    item_id: string;
}

class RemoveItemAdditionalService {
    async execute({ item_additional_id, order_id, item_id }: ItemAdditionalRequest ) {

        // If an explicit item_additional_id is provided, try deleting by id
        if (item_additional_id) {
            const deleted = await prismaClient.items_additionals.delete({
                where: { id: item_additional_id }
            });
            return deleted;
        }

        // otherwise, find the record by composite keys and delete by id
        const existing = await prismaClient.items_additionals.findFirst({
            where: {
                order_id: order_id,
                item_id: item_id,
            }
        });

        if (!existing) {
            throw new Error("Item adicional não encontrado para remoção.");
        }

        const itemAdditional = await prismaClient.items_additionals.delete({
            where: { id: existing.id }
        });

        return itemAdditional;

    }
}

export { RemoveItemAdditionalService }