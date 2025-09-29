import prismaClient from "../../prisma";

interface IngredientRequest {
  ingredient_id: string;
  product_id: string;
}

class UpdateAdditionalService {
  async execute({ product_id, ingredient_id }: IngredientRequest) {
    // Buscar o registro específico
    const additional = await prismaClient.ingredient_product.findFirst({
      where: {
        ingredient_id: ingredient_id,
        product_id: product_id
      }
    });

    if (!additional) {
      throw new Error("Adicional não encontrado.");
    }

    // Alternar o valor de 'adicionado'
    const updated = await prismaClient.ingredient_product.update({
      where: {
        id: additional.id
      },
      data: {
        adicionado: !additional.adicionado
      }
    });

    return updated;
  }
}

export { UpdateAdditionalService }
