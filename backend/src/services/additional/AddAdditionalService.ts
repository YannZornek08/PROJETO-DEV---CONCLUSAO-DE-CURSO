import prismaClient from "../../prisma";

interface AdditionalRequest {
    ingredient_id: string;
    product_id: string;
}

class AddAdditionalService {
    async execute({ ingredient_id, product_id}: AdditionalRequest ) {

        const additional = await prismaClient.ingredient_product.create({
            data: {
                ingredient_id: ingredient_id,
                product_id: product_id,
            }
        })

        return additional;

    }
}

export { AddAdditionalService }