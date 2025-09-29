import prismaClient from "../../prisma";

interface DetailRequest {
    table_id: string;
}

// No seu backend, adicione uma verificação:
class DetailTableService {
    async execute({ table_id }: DetailRequest ) {
        
        // Verifica se a mesa existe
        const tableExists = await prismaClient.table.findUnique({
            where: { id: table_id }
        });

        if (!tableExists) {
            throw new Error("Mesa não encontrada");
        }

        const table = await prismaClient.table.findMany({
            where: { id: table_id }
        });

        return table;
    }
}

export { DetailTableService }