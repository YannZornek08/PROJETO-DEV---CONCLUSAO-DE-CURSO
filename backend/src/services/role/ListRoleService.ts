import prismaClient from "../../prisma";

class ListRoleService{
    async execute() {

        const role = await prismaClient.role.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return role;
    }
}

export { ListRoleService }