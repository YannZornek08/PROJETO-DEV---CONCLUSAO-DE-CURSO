import prismaClient from "../../prisma";

interface ItemIngredientRequest {
    item_ingredient_id: string;
    order_id: string;
}

class RemoveItemIngredientService {
    async execute({ item_ingredient_id, order_id }: ItemIngredientRequest ) {

        const itemIngredient = await prismaClient.items_ingredients.delete({
            where: {
                id: item_ingredient_id,
                order_id: order_id
            }
        })

        return itemIngredient;

    }
}

export { RemoveItemIngredientService }