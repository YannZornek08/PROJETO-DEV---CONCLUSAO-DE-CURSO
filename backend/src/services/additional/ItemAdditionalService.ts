import prismaClient from "../../prisma";

interface ItemAdditionalRequest {
    categories_additionals_id: string;
    adicionado: boolean;
}

class ItemAdditionalService {
    async execute({ categories_additionals_id, adicionado }: ItemAdditionalRequest ) {

        const additional = await prismaClient.items_additionals.create({
            data: {
                categories_additionals_id: categories_additionals_id,
                adicionado: true,
            }
        })

        return additional;

    }
}

export { ItemAdditionalService }