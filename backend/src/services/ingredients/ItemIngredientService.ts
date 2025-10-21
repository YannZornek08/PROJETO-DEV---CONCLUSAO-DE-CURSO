import prismaClient from "../../prisma";

interface ItemIngredientRequest {
    ingredient_product_id: string;
    order_id: string;
}

class ItemIngredientService {
    async execute({ ingredient_product_id, order_id }: ItemIngredientRequest) {

        // Verifica se já existe um registro igual
        const existingItem = await prismaClient.items_ingredients.findFirst({
            where: {
                ingredient_product_id,
                order_id,
            },
        });

        if (existingItem) {
            // Já existe — pode retornar o existente ou lançar erro
            console.log("Item já existente:", existingItem);
            return existingItem;
            // ou, se preferir, lance um erro:
            // throw new Error("Esse ingrediente já foi adicionado a este pedido.");
        }

        const ingredient = await prismaClient.items_ingredients.create({
            data: {
                order_id: order_id,
                ingredient_product_id: ingredient_product_id,
                adicionado: true,
            }
        })

        return ingredient;

    }
}

export { ItemIngredientService }