import prismaClient from "../../prisma";

class SearchProductService {
  async execute(name: string) {
    if (!name || name.trim() === "") {
      return await prismaClient.product.findMany({
        orderBy: { name: "asc" },
      });
    }

    const products = await prismaClient.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive", // ignora maiúsculas/minúsculas
        },
      },
      orderBy: { name: "asc" },
    });

    return products;
  }
}

export { SearchProductService };
