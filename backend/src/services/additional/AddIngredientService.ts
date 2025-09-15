import prismaClient from "../../prisma";

interface IngredientRequest {
    ingredient_id: string;
    product_id: string;
    adicionado: boolean;
}

class AddIngredientService {
  async execute({ product_id, ingredient_id, adicionado }: IngredientRequest) {
    const addingredient = await prismaClient.ingredient_product.updateMany({
      where: {
        ingredient_id: ingredient_id,
        product_id: product_id,
        adicionado: false,
      },
      data: {
        ingredient_id: ingredient_id,
        product_id: product_id,
        adicionado: true,
      },
    });

    return addingredient;
  }
}

export { AddIngredientService }