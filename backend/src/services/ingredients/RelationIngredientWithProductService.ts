import prismaClient from "../../prisma";

interface IngredientRequest {
    ingredient_id: string;
    product_id: string;
}

class AddIngredientService {
    async execute({ ingredient_id, product_id}: IngredientRequest ) {

        const ingredient = await prismaClient.ingredient_product.create({
            data: {
                ingredient_id: ingredient_id,
                product_id: product_id,
            }
        })

        return ingredient;

    }
}

export { AddIngredientService }