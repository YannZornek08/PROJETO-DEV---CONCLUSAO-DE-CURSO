import prismaClient from "../../prisma";

interface IngredientRequest {
  ingredient_id: string;
  product_id: string;
}

class RemovingAdditionalService {
  async execute({ product_id, ingredient_id }: IngredientRequest) {
    // 1. Buscar o registro específico
    const additional = await prismaClient.ingredient_product.findFirst({
      where: {
        ingredient_id: ingredient_id,
        product_id: product_id,
        adicionado: true
      }
    });

    if (!additional) {
      throw new Error("Adicional não encontrado ou já está marcado como não adicionado.");
    }

    // 2. Atualizar pelo ID único
    const updated = await prismaClient.ingredient_product.update({
      where: {
        id: additional.id
      },
      data: {
        adicionado: false
      }
    });

    return updated;
  }
}

export { RemovingAdditionalService }
