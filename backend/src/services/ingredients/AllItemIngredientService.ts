import prismaClient from "../../prisma";
import { ListIngredientByProductService } from "./ListIngredientByProductService";

interface AllItemIngredientRequest {
  product_id: string;
}

interface OrderRequest {
  order_id: string;
}

class AllItemIngredientService {
  async execute({ product_id }: AllItemIngredientRequest, { order_id }: OrderRequest) {
    // Reaproveitando o service que lista ingredientes
    const listIngredientByProductService = new ListIngredientByProductService();
    const ingredientesDoProduto = await listIngredientByProductService.execute({ product_id });

    if (!ingredientesDoProduto || ingredientesDoProduto.length === 0) {
      throw new Error("Nenhum ingrediente encontrado para esse produto");
    }

    // Verificar quais ingredientes já existem para o pedido
    const existingItems = await prismaClient.items_ingredients.findMany({
      where: {
        order_id,
        ingredient_product_id: {
          in: ingredientesDoProduto.map((i) => i.id),
        },
      },
      select: { ingredient_product_id: true },
    });

    const existingIds = new Set(
      existingItems.map((item) => item.ingredient_product_id)
    );

    // Filtrar apenas os ingredientes que ainda não foram adicionados
    const dataToInsert = ingredientesDoProduto
      .filter((ingredient) => !existingIds.has(ingredient.id))
      .map((ingredient) => ({
        ingredient_product_id: ingredient.id,
        order_id,
        adicionado: true,
      }));

    // Preparar os dados para inserir em massa
    // const dataToInsert = ingredientesDoProduto.map((ingredient) => ({
    //   ingredient_product_id: ingredient.id, // ajuste conforme seu schema
    //   order_id: order_id, // ajuste conforme seu schema
    //   adicionado: true,
    // }));

    // Criar todos de uma vez
    const created = await prismaClient.items_ingredients.createMany({
      data: dataToInsert,
    });

    console.log("Itens ingredientes criados:", created);
    return created;
  }
}

export { AllItemIngredientService };
