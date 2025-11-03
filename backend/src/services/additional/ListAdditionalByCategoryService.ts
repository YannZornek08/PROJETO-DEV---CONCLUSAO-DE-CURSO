import prismaClient from "../../prisma";

interface ingredientsProductsRequest {
    category_id: string;
}

class ListAdditionalByCategoryService {
    async execute ({ category_id }: ingredientsProductsRequest) {

        const findByCategory = await prismaClient.categories_additionals.findMany({
            where: {
            category_id: category_id,
            },
            select: {
            id: true, // exemplo de campo específico da própria tabela
            category_id: true,
            category: {
                select: {
                    name: true,
                },
            },
            additionals_id: true,
            additionals: {
                select: {
                name: true,
                },
            },
            },
        });

        return findByCategory;

    }
}

export { ListAdditionalByCategoryService }