import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface CostumerRequest {
    name: string;
    email: string;
    password: string;
    dt_nasc: string;
}

class CreateCostumerService {
    async execute({ name, email, password, dt_nasc}: CostumerRequest) {

        // verificar se ele enviou um email
        if(!email) {
            throw new Error("Email incorrect")
        }

        // verificar se o email já está cadastrado na plataforma
        const costumerAlreadyExists = await prismaClient.costumer.findFirst({
            where: {
                email: email
            }
        })

        if(costumerAlreadyExists) {
            throw new Error("Costumer already exists")
        }

        const passwordHash = await hash(password, 8)

        const Costumer = await prismaClient.costumer.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                dt_nasc: dt_nasc
            },
            select: {
                id: true,
                name: true,
                email: true,
                dt_nasc: true,
            }
        })

        return Costumer;
    }
}

export { CreateCostumerService }