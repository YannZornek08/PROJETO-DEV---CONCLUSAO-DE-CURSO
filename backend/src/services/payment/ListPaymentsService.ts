import prismaClient from "../../prisma";

class ListPaymentService{
    async execute() {

        const payment = await prismaClient.payment.findMany({
            select: {
                id: true,
                order_id: true,
                mtdo_pagto_id: true,
            }
        })

        return payment;
    }
}

export { ListPaymentService }