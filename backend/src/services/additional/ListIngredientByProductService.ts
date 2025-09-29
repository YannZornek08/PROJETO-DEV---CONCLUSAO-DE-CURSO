import prismaClient from "../../prisma";

interface ingredientsProductsRequest {
    product_id: string;
}

class ListIngredientByCategoryService {
    async execute ({ product_id}: ingredientsProductsRequest) {

        const findByCategory = await prismaClient.ingredient_product.findMany({
            where: {
            product_id: product_id,
            },
            select: {
            id: true, // exemplo de campo específico da própria tabela
            adicionado: true,
            product_id: true,
            ingredient_id: true,
            ingredient: {
                select: {
                name: true,
                },
            },
            product: {
                select: {
                name: true,
                },
            },
            },
        });

        return findByCategory;

    }
}

export { ListIngredientByCategoryService }