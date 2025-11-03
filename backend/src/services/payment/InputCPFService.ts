import prismaClient from "../../prisma";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

interface PaymmentRequest {
    cpf: number | string;
    costumer_id: string;
}

// Função para serializar BigInt
function serializeBigInt(obj: any) {
    return JSON.parse(
        JSON.stringify(obj, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );
}

class InputCPFService {
    async execute({ cpf, costumer_id }: PaymmentRequest) {

        const cpfStr = String(cpf).replace(/\D/g, ''); // remove pontos e traços

        // Validação usando cpf-cnpj-validator
        if (!cpfValidator.isValid(cpfStr)) {
            throw new Error("CPF inválido");
        }

        // // Verificar se o CPF já está cadastrado na plataforma
        // const userAlreadyExists = await prismaClient.costumer.findFirst({
        //     where: { 
        //         cpf: BigInt(cpfStr) // Converte para BigInt antes de comparar
        //     },
        // });

        // if (userAlreadyExists) {
        //     throw new Error("Costumer_cpf already exists");
        // }

        // Atualizar o CPF do cliente
        const inputCPF = await prismaClient.costumer.update({
            where: {
                id: costumer_id
            },
            data: {
                cpf: BigInt(cpfStr) // Converte para BigInt antes de salvar
            },
            select: {
                id: true,
                name: true,
                cpf: true,
                dt_nasc: true,
                email: true
            },
        });

        // Retorna o resultado serializado
        return serializeBigInt(inputCPF);
    }
}

export { InputCPFService };