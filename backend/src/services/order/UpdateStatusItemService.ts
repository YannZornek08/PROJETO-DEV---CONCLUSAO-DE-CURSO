import prismaClient from "../../prisma";

type ItemStatusRequest = {
    item_id: string;
    status: number;
};

/**
 * Service para atualizar o campo `status` da tabela `item`.
 * Valores permitidos: 0, 1, 2, 3
 */
export default class UpdateStatusItemService {
    async execute({ item_id, status }: ItemStatusRequest) {
        const allowedStatuses = [0, 1, 2, 3];
        if (!allowedStatuses.includes(status)) {
            throw new Error('Status inválido. Valores permitidos: 0, 1, 2, 3.');
        }

        const item = await prismaClient.item.findUnique({
            where: { id: item_id },
            select: { id: true }
        });

        if (!item) {
            throw new Error("Item não encontrado");
        }

        const updatedItem = await prismaClient.item.update({
            where: { id: item_id },
            data: { status },
            select: { id: true, status: true }
        });

        return updatedItem;
    }
}

export { UpdateStatusItemService };
