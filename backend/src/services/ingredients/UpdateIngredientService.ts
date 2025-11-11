import prismaClient from "../../prisma";

interface IngredientRequest {
  ingredient_product_id: string;
  order_id: string;
  item_id: string;
}

class UpdateIngredientService {
  // Toggle: cria se não existir, remove se existir
  async execute({ ingredient_product_id, order_id, item_id }: IngredientRequest) {
    // Buscar o registro específico
    const existing = await prismaClient.items_ingredients.findFirst({
      where: {
        ingredient_product_id,
        order_id,
        item_id,
      },
    });

    if (existing) {
      // Se existir, remove (deseleciona)
      const deleted = await prismaClient.items_ingredients.delete({
        where: { id: existing.id },
      });
      return { action: "deleted", record: deleted };
    }

    // Se não existir, cria (seleciona)
    const created = await prismaClient.items_ingredients.create({
      data: {
        ingredient_product_id,
        order_id,
        item_id,
      },
    });

    return { action: "created", record: created };
  }
}

export { UpdateIngredientService };
