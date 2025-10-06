import prismaClient from "../../prisma";

interface IngredientRequest {
  ingredient_product_id: string;
}

class UpdateIngredientService {
  async execute({ ingredient_product_id }: IngredientRequest) {
    // Buscar o registro específico
    const ingredient = await prismaClient.items_ingredients.findFirst({
      where: {
        ingredient_product_id: ingredient_product_id
      }
    });

    if (!ingredient) {
      throw new Error("Ingrediente não encontrado.");
    }

    // Alternar o valor de 'adicionado'
    const updated = await prismaClient.items_ingredients.update({
      where: {
        id: ingredient.id
      },
      data: {
        adicionado: !ingredient.adicionado
      }
    });

    return updated;
  }
}

export { UpdateIngredientService }