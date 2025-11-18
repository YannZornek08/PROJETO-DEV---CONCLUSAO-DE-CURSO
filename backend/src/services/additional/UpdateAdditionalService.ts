import prismaClient from "../../prisma";

interface AdditionalRequest {
  categories_additionals_id: string;
  order_id: string;
  item_id: string;
}

class UpdateAdditionalService {
  // Toggle behavior implemented as create (when not exists) or delete (when exists)
  async execute({ categories_additionals_id, order_id, item_id }: AdditionalRequest) {
    // Buscar o registro específico para este item/order/adicional
    const existing = await prismaClient.items_additionals.findFirst({
      where: {
        categories_additionals_id: categories_additionals_id,
        order_id: order_id,
        item_id: item_id,
      },
    });

    if (existing) {
      // se existir, remove (deseleciona)
      const deleted = await prismaClient.items_additionals.delete({
        where: { id: existing.id },
      });
      return { action: "deleted", record: deleted };
    }

    // se não existir, cria (seleciona)
    const created = await prismaClient.items_additionals.create({
      data: {
        order_id,
        categories_additionals_id,
        item_id,
      },
    });

    return { action: "created", record: created };
  }
}

export { UpdateAdditionalService }