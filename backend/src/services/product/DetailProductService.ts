import prismaClient from "../../prisma";

interface ProductDetailRequest {
    product_id: string
}

class DetailProductService {
    async execute({ product_id }: ProductDetailRequest) {

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
            }
        })

        return product
    }
}

export { DetailProductService }