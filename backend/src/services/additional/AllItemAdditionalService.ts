import prismaClient from "../../prisma";
import { ListAdditionalByCategoryService } from "./ListAdditionalByCategoryService";

interface AllItemAdditionalRequest {
  category_id: string;
}

class AllItemAdditionalService {
  async execute({ category_id }: AllItemAdditionalRequest) {
    // Reaproveitando o service que lista Additionals
    const listAdditionalByProductService = new ListAdditionalByCategoryService();
    const additionalsDoProduto = await listAdditionalByProductService.execute({ category_id });

    if (!additionalsDoProduto || additionalsDoProduto.length === 0) {
      throw new Error("Nenhum Additional encontrado para esse produto");
    }

    // Preparar os dados para inserir em massa
    const dataToInsert = additionalsDoProduto.map((additional) => ({
      categories_additionals_id: additional.id, // ajuste conforme seu schema
      adicionado: false,
    }));

    // Criar todos de uma vez
    const created = await prismaClient.items_additionals.createMany({
      data: dataToInsert,
    });

    return created;
  }
}

export { AllItemAdditionalService };
