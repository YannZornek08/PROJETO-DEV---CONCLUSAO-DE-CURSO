import prismaClient from "../../prisma";

class ListTablesService {
    async execute() {

        const tables = await prismaClient.table.findMany({
            where:{
                number: { not: null }
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return tables;

    }
}

export { ListTablesService }