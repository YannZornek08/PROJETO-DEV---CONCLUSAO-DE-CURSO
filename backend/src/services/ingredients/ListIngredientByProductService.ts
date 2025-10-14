import prismaClient from "../../prisma";

interface ingredientsProductsRequest {
    product_id: string;
}

class ListIngredientByProductService {
    async execute ({ product_id }: ingredientsProductsRequest) {

        const findByCategory = await prismaClient.ingredient_product.findMany({
            where: {
            product_id: product_id,
            },
            select: {
            id: true, // exemplo de campo específico da própria tabela
            product_id: true,
            product: {
                select: {
                    name: true,
                },
            },
            ingredient_id: true,
            ingredient: {
                select: {
                name: true,
                },
            },
            },
        });

        return findByCategory;

    }
}

export { ListIngredientByProductService }