import prismaClient from "../../prisma";

interface PaymentRequest {
  order_id: string;
  mtdo_pagto_id: string;
}

class CreatePaymentService {
  async execute({ mtdo_pagto_id, order_id }: PaymentRequest) {
    
    const order = await prismaClient.order.findUnique({
      where: { id: order_id },
    });

    if (!order) {
      throw new Error("Pedido não encontrado!");
    }

    const payment = await prismaClient.payment.create({
      data: {
        order_id,
        mtdo_pagto_id,
      },
      select: {
        id: true,
        order_id: true,
        mtdo_pagto_id: true,
      },
    });

    
    return payment;
  }
}

export { CreatePaymentService };
