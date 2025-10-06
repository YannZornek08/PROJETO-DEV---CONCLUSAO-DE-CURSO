import prismaClient from "../../prisma";

interface AdditionalRequest {
  categories_additionals_id: string;
}

class UpdateAdditionalService {
  async execute({ categories_additionals_id }: AdditionalRequest) {
    // Buscar o registro específico
    const additional = await prismaClient.items_additionals.findFirst({
      where: {
        categories_additionals_id: categories_additionals_id
      }
    });

    if (!additional) {
      throw new Error("Adicional não encontrado.");
    }

    // Alternar o valor de 'adicionado'
    const updated = await prismaClient.items_additionals.update({
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