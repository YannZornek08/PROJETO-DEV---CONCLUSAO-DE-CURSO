import prismaClient from "../../prisma";

interface ItemAdditionalRequest {
    item_id: string;
    categories_additionals_id: string;
    order_id: string;
}

class ItemAdditionalService {
    async execute({ categories_additionals_id, order_id, item_id }: ItemAdditionalRequest) {

        // Verifica se já existe um registro igual
        const existingItem = await prismaClient.items_additionals.findFirst({
            where: {
                categories_additionals_id: categories_additionals_id,
                order_id: order_id,
                item_id: item_id
            },
        });

        if (existingItem) {
            // Já existe — pode retornar o existente ou lançar erro
            console.log("Item já existente:", existingItem);
            return existingItem;
            // ou, se preferir, lance um erro:
            // throw new Error("Esse ingrediente já foi adicionado a este pedido.");
        }

        const additional = await prismaClient.items_additionals.create({
            data: {
                order_id: order_id,
                categories_additionals_id: categories_additionals_id,
                item_id: item_id,
            }
        })

        return additional;

    }
}

export { ItemAdditionalService }