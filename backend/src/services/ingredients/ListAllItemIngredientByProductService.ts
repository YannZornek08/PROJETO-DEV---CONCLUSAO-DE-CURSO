import prismaClient from "../../prisma";

interface ingredientsProductsRequest {
    product_id: string;
    order_id: string;
}

class ListAllItemIngredientByProductService {
    async execute({ product_id, order_id }: ingredientsProductsRequest) {

        const findByCategory = await prismaClient.items_ingredients.findMany({
            where: {
                order_id: order_id,
                ingredient_product: {
                    product_id: product_id, // aqui ele filtra pelos produtos relacionados
                },
            },
            select: {
                id: true, // exemplo de campo específico da própria tabela
                ingredient_product_id: true,
                order_id: true,
                ingredient_product: {
                    select: {
                        product: {
                            select: {
                                name: true,
                            }
                        },
                        ingredient: {
                            select: {
                                name: true,
                            }
                        },
                    }
                },
                adicionado: true,
            }
        });

        console.log("Ingredientes encontrados:", findByCategory);
        return findByCategory;

    }
}

export { ListAllItemIngredientByProductService }