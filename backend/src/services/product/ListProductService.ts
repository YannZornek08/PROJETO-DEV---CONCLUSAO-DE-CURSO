import prismaClient from "../../prisma";

class ListProductService{
    async execute() {

        const product = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true
            }
        })

        return product;
    }
}

export { ListProductService }