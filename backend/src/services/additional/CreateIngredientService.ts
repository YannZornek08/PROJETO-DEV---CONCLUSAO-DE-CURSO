import prismaClient from "../../prisma";

interface ingredientsRequest {
    name: string;
}

class CreateIngredientService {
    async execute({ name }: ingredientsRequest ) {

        const ingredient = await prismaClient.ingredient.create({
            data: {
                name: name
            }
        })

        return ingredient;

    }
}

export { CreateIngredientService }