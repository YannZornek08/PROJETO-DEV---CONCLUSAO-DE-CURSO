import prismaClient from "../../prisma"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string;
    password: string;
}

class AuthCostumerService {
    async execute({ email, password}: AuthRequest) {

        //verificar se o email existe.
        const costumer = await prismaClient.costumer.findFirst({
            where: {
                email: email
            }
        })

        if(!costumer) {
            throw new Error("costumer/password incorrect")
        }

        // verificar se a senha que ele enviou está correta.
        const passwordMatch = await compare(password, costumer.password)

        if(!passwordMatch) {
            throw new Error("costumer/password-incorrect")
        }

        // Se funcionou sem imprevistos, geraremos o token para o usuário.
        const token = sign (
            {
                name: costumer.name,
                email: costumer.email
            },
            process.env.JWT_SECRET,
            {
                subject: costumer.id,
                expiresIn: '30d'
            }
        )

        return{
            id: costumer.id,
            name: costumer.name,
            email: costumer.email,
            token : token
        }
    }
}

export { AuthCostumerService }