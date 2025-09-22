import prismaClient from "../../prisma";

interface PaymentRequest {
    order_id: string;
    table_id: string;
    mtdo_pagto_id: string;
}

class CreatePaymentService {
    async execute({ mtdo_pagto_id, order_id, table_id }: PaymentRequest) {

        const payment = await prismaClient.payment.create({
            data: {
                order_id,
                table_id,
                mtdo_pagto_id
            },
            select: {
                id: true,
                order_id: true,
                table_id: true,
                mtdo_pagto_id: true,
            }
        })

        return payment;
    }
}

export { CreatePaymentService }
