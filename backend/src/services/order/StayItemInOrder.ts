import prismaClient from "../../prisma";

interface StayItemInOrderRequest {
    item_id: string;
}

class StayItemInOrderService {
    async execute({ item_id }: StayItemInOrderRequest) {
        const item = await prismaClient.item.findUnique({
            where: { id: item_id },
            select: { adicionado: true }
        });

        if (!item) {
            throw new Error("Item não encontrado");
        }

        let newAdicionado = true;

        const updatedItem = await prismaClient.item.update({
            where: { id: item_id },
            data: { adicionado: newAdicionado },
            select: { id: true, adicionado: true }
        });

        return updatedItem;
    }
}

export { StayItemInOrderService };
