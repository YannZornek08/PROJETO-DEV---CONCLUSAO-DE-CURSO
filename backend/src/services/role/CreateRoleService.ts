import prismaClient from "../../prisma";

interface RoleRequest {
    name: string
}

class CreateRoleService {
    async execute({ name }: RoleRequest) {

        if(name === '') {
            throw new Error('Name invalid')
        }

        const role = await prismaClient.role.create({
            data:{
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        })

        return role;
    }
}

export { CreateRoleService }