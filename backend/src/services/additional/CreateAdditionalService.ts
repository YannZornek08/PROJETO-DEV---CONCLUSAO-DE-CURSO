import prismaClient from "../../prisma";

interface additionalsRequest {
    name: string;
    price: string;
}

class CreateAdditionalService {
    async execute({ name, price }: additionalsRequest ) {

        const additional = await prismaClient.additionals.create({
            data: {
                name: name,
                price: price
            }
        })

        return additional;

    }
}

export { CreateAdditionalService }