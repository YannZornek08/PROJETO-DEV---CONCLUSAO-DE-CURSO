import prismaClient from "../../prisma";

interface TableRequest {
    table_id: string;
}

class TakeTableService {
    async execute({ table_id }: TableRequest) {

        const table = await prismaClient.table.update({
            where: {
                id: table_id
            },
            data: {
                status: true,
            }
        })

        return table;

    }
}

export { TakeTableService }