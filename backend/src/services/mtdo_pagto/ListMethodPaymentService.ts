import prismaClient from "../../prisma";

class ListMethodPaymentService {
  async execute() {
    const methods = await prismaClient.mtdo_pagto.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return methods;
  }
}

export { ListMethodPaymentService };
