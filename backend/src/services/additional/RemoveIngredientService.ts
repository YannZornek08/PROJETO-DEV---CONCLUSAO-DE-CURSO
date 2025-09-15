import prismaClient from "../../prisma";

interface IngredientRequest {
    ingredient_id: string;
    product_id: string;
    adicionado: boolean;
}

class RemoveIngredientService {
  async execute({ product_id, ingredient_id, adicionado }: IngredientRequest) {
    const removeingredient = await prismaClient.ingredient_product.updateMany({
      where: {
        ingredient_id: ingredient_id,
        product_id: product_id,
        adicionado: true,
      },
      data: {
        ingredient_id: ingredient_id,
        product_id: product_id,
        adicionado: false,
      },
    });

    return removeingredient;
  }
}

export { RemoveIngredientService }