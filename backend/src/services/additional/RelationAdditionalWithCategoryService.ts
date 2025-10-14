import prismaClient from "../../prisma";

interface AdditionalRequest {
    additional_id: string;
    category_id: string;
}

class AddAdditionalService {
    async execute({ additional_id, category_id}: AdditionalRequest ) {

        const additional = await prismaClient.categories_additionals.create({
            data: {
                additionals_id: additional_id,
                category_id: category_id,
            }
        })

        return additional;

    }
}

export { AddAdditionalService }