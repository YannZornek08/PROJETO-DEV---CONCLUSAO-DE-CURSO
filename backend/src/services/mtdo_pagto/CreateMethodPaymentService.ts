import prismaClient from "../../prisma";

interface Mtdo_pagtoRequest {
    name: string;
}

class CreateMtdoPagtoService {
    async execute({ name }: Mtdo_pagtoRequest) {

        if(name === '') {
            throw new Error('Payment method invalid')
        }

        const mtdo_pagto = await prismaClient.mtdo_pagto.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        })

        return mtdo_pagto;
    }
}

export { CreateMtdoPagtoService }