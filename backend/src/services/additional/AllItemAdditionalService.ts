import prismaClient from "../../prisma";
import { ListAdditionalByCategoryService } from "./ListAdditionalByCategoryService";

interface AllItemAdditionalRequest {
  category_id: string;
}

interface OrderRequest {
  order_id: string;
}

class AllItemAdditionalService {
  async execute({ category_id }: AllItemAdditionalRequest, { order_id }: OrderRequest) {
    // Reaproveitando o service que lista adicionais
    const listAdditionalByCategoryService = new ListAdditionalByCategoryService();
    const adicionaisDaCategoria = await listAdditionalByCategoryService.execute({ category_id });

    if (!adicionaisDaCategoria || adicionaisDaCategoria.length === 0) {
      throw new Error("Nenhum adicional encontrado para essa categoria");
    }

    // Verificar quais adicionais já existem para o pedido
    const existingItems = await prismaClient.items_additionals.findMany({
      where: {
        order_id,
        categories_additionals_id: {
          in: adicionaisDaCategoria.map((i) => i.id),
        },
      },
      select: { categories_additionals_id: true },
    });

    const existingIds = new Set(
      existingItems.map((item) => item.categories_additionals_id)
    );

    // Filtrar apenas os adicionais que ainda não foram adicionados
    const dataToInsert = adicionaisDaCategoria
      .filter((additional) => !existingIds.has(additional.id))
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

export { AllItemAdditionalService };
