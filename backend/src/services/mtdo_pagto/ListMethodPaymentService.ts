import prismaClient from "../../prisma";

class ListMtdoPagtoService{
    async execute() {

        const mtdo_pagto = await prismaClient.mtdo_pagto.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return mtdo_pagto;
    }
}

export { ListMtdoPagtoService }