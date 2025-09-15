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
            include: {
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
        })

        return findByCategory;

    }
}

export { ListIngredientByCategoryService }