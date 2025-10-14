import prismaClient from "../../prisma";
import { ListIngredientByProductService } from "../ingredients/ListIngredientByProductService";

interface AllItemIngredientRequest {
  product_id: string;
}

class AllItemIngredientService {
  async execute({ product_id }: AllItemIngredientRequest) {
    // Reaproveitando o service que lista ingredientes
    const listIngredientByProductService = new ListIngredientByProductService();
    const ingredientesDoProduto = await listIngredientByProductService.execute({ product_id });

    if (!ingredientesDoProduto || ingredientesDoProduto.length === 0) {
      throw new Error("Nenhum ingrediente encontrado para esse produto");
    }

    // Preparar os dados para inserir em massa
    const dataToInsert = ingredientesDoProduto.map((ingrediente) => ({
      ingredient_product_id: ingrediente.id, // ajuste conforme seu schema
      adicionado: true,
    }));

    // Criar todos de uma vez
    const created = await prismaClient.items_ingredients.createMany({
      data: dataToInsert,
    });

    return created;
  }
}

export { AllItemIngredientService };
