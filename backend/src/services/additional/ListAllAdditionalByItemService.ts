import prismaClient from "../../prisma";

interface ListItemAdditionalRequest {
    item_id: string;
}

class ListAdditionalByItemService {
    async execute({ item_id }: ListItemAdditionalRequest) {

        const findByCategory = await prismaClient.items_additionals.findMany({
            where: {
                item_id: item_id,
            },
            select: {
                id: true, // exemplo de campo específico da própria tabela
                categories_additionals_id: true,
                item_id: true,
                categories_additionals: {
                    select: {
                        additionals_id: true,
                        additionals: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
                order_id: true,
            },
        });

        return findByCategory.map((cat) => ({
            id: cat.id,
            item_id: cat.item_id,
            categories_additional_id: cat.categories_additionals_id,
            name: cat.categories_additionals.additionals.name,
            price: cat.categories_additionals.additionals.price,
        }));;

    }
}

export { ListAdditionalByItemService }