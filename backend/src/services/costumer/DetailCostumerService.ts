import prismaClient from "../../prisma";

class DetailCostumerService {
    async execute(Costumer_id: string) {

        const costumer = await prismaClient.costumer.findFirst({
            where: {
                id: Costumer_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                dt_nasc: true
            }
        })

        return costumer
    }
}

export { DetailCostumerService }