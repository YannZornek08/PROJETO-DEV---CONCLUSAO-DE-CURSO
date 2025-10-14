import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
    note: string;
}

class AddNoteService {
    async execute({ order_id, note }: OrderRequest ) {

        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                note: note
            }
        })

        return order;

    }
}

export { AddNoteService }