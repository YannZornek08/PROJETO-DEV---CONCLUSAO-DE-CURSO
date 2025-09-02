import prismaClient from "../../prisma";
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password}: AuthRequest) {
        console.log(email);

        //verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        
        if(!user){
            throw new Error("User/password incorrect")
        }
        
        //verificar se a senha que ele enviou está correta.
        const passwordHash = await compare(password, user.password)

        if(!passwordHash){
            throw new Error("User/password incorrect")
        }

        // Se funcionou sem imprevistos, geraremos o token para o usuário.
        const token = sign (
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        
        return{
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService}