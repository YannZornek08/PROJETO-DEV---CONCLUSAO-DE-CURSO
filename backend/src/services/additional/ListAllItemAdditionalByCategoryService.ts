import prismaClient from "../../prisma";

interface categoriesAdditionalsRequest {
    category_id: string;
    order_id: string;
}

class ListAllItemAdditionalByCategoryService {
    async execute({ category_id, order_id }: categoriesAdditionalsRequest) {

        const findByCategory = await prismaClient.items_additionals.findMany({
            where: {
                order_id: order_id,
                categories_additionals: {
                    category_id: category_id, // aqui ele filtra pelos produtos relacionados
                },
            },
            select: {
                id: true, // exemplo de campo específico da própria tabela
                categories_additionals_id: true,
                order_id: true,
                categories_additionals: {
                    select: {
                        category_id: true,
                        category: {
                            select: {
                                name: true,
                            }
                        },
                        additionals: {
                            select: {
                                name: true,
                                price: true,
                            }
                        },
                    }
                },
                adicionado: true,
            }
        });

        console.log("Adicionais encontrados:", findByCategory);
        return findByCategory;

    }
}

export { ListAllItemAdditionalByCategoryService }