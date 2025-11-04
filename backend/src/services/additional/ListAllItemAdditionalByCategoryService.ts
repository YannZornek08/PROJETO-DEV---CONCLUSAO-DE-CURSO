import prismaClient from "../../prisma";

interface categoriesAdditionalsRequest {
    category_id: string;
    order_id: string;
    item_id?: string;
}

class ListAllItemAdditionalByCategoryService {
    async execute({ category_id, order_id, item_id }: categoriesAdditionalsRequest) {

        // Busca TODOS os adicionais da categoria e marca se cada um já foi adicionado
        const whereForItems: any = { order_id };
        if (item_id) whereForItems.item_id = item_id;

        const categories = await prismaClient.categories_additionals.findMany({
            where: { category_id: category_id },
            select: {
                id: true,
                category_id: true,
                category: { select: { name: true } },
                additionals: { select: { id: true, name: true, price: true } },
                items_additionals: {
                    where: whereForItems,
                    select: { id: true }
                }
            }
        });

        // Format response similar to previous shape but include adicionado boolean
        const formatted = categories.map((cat) => ({
            id: cat.id,
            categories_additionals: {
                id: cat.id,
                category_id: cat.category_id,
                category: {
                    name: cat.category?.name
                },
                additionals: cat.additionals,
            },
            order_id: order_id,
        }));

        return formatted;

    }
}

export { ListAllItemAdditionalByCategoryService }