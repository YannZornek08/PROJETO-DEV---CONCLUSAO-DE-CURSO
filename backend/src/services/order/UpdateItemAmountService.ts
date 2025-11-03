import prismaClient from "../../prisma";

interface UpdateItemAmountRequest {
    item_id: string;
    action: "increase" | "decrease";
}

class UpdateItemAmountService {
    async execute({ item_id, action }: UpdateItemAmountRequest) {
        const item = await prismaClient.item.findUnique({
            where: { id: item_id },
            select: { amount: true }
        });

        if (!item) {
            throw new Error("Item não encontrado");
        }

        let newAmount = item.amount;

        if (action === "increase") {
            newAmount += 1;
        }
        else if (action === "decrease") {
            // ✅ Não permite ficar menor que 1
            if (newAmount === 1) {
                throw new Error("A quantidade mínima é 1");
            }
            newAmount -= 1;
        }

        const updatedItem = await prismaClient.item.update({
            where: { id: item_id },
            data: { amount: newAmount },
            select: { id: true, amount: true }
        });

        return updatedItem;
    }
}

export { UpdateItemAmountService };
