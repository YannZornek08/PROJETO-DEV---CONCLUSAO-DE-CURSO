import prismaClient from "../../prisma";

class DetailCostumerService {
    async execute(costumer_id: string) {

        const costumer = await prismaClient.costumer.findFirst({
            where: {
                id: costumer_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                dt_nasc: true,
                cpf: true
            }
        });

        if (!costumer) {
            throw new Error("Cliente não encontrado");
        }

        return {
            ...costumer,
            cpf: costumer.cpf?.toString(),
        };
    }
}

export { DetailCostumerService }