import prismaClient from "../../prisma";

interface ProductIngredientsRequest {
    product_id: string;
    order_id: string;
    item_id: string;
}

class ListAllItemIngredientByProductService {
    async execute({ product_id, order_id, item_id }: ProductIngredientsRequest) {

        // Busca TODOS os ingredientes da categoria e marca se cada um já foi adicionado
        const whereForItems: any = { order_id };
        if (item_id) whereForItems.item_id = item_id;

        const ingredient = await prismaClient.ingredient_product.findMany({
            where: { product_id: product_id },
            select: {
                id: true,
                product_id: true,
                product: { select: { name: true } },
                ingredient: { select: { id: true, name: true } },
                Items_ingredients: {
                    where: whereForItems,
                    select: { id: true }
                }
            }
        });

        // Format response similar to previous shape but include adicionado boolean
        const formatted = ingredient.map((ing) => ({
            id: ing.id,
            ingredient_product: {
                id: ing.id,
                product_id: ing.product_id,
                product: {
                    name: ing.product?.name
                },
                ingredient: ing.ingredient,
            },
            order_id: order_id,
        }));

        return formatted;

    }
}

export { ListAllItemIngredientByProductService }