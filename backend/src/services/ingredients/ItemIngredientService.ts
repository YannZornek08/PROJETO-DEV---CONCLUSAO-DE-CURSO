import prismaClient from "../../prisma";

interface ItemIngredientRequest {
    ingredient_product_id: string;
}

class ItemIngredientService {
    async execute({ ingredient_product_id }: ItemIngredientRequest ) {

        const ingredient = await prismaClient.items_ingredients.create({
            data: {
                ingredient_product_id: ingredient_product_id,
                adicionado: true,
            }
        })

        return ingredient;

    }
}

export { ItemIngredientService }