import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthCostumerService {
  async execute({ email, password }: AuthRequest) {
    // Verifica se o costumer existe
    const costumer = await prismaClient.costumer.findFirst({
      where: { email },
    });

    if (!costumer) {
      throw new Error("Email ou senha incorretos!");
    }

    // Compara a senha enviada com a senha criptografada do banco
    const passwordMatch = await compare(password, costumer.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos!");
    }

    // Gera token JWT
    const token = sign(
      {
        name: costumer.name,
        email: costumer.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: costumer.id,
        expiresIn: "30d",
      }
    );

    return {
      id: costumer.id,
      name: costumer.name,
      email: costumer.email,
      token,
    };
  }
}

export { AuthCostumerService };
