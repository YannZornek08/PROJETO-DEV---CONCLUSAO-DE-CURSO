import prismaClient from "../../prisma";

interface tableRequest {
    number: number;
}

class CreateTableService {
    async execute({ number }: tableRequest ) {

        const table = await prismaClient.table.create({
            data: {
                number: number
            }
        })

        return table;

    }
}

export { CreateTableService }