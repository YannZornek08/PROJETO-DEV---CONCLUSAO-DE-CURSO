import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailRequest) {

        // Verifica se o pedido existe
        const orderExists = await prismaClient.order.findUnique({
            where: { id: order_id },
            select: { id: true }
        });

        if (!orderExists) {
            throw new Error("Pedido não encontrado");
        }

        // Busca os dados principais do pedido
        const order = await prismaClient.order.findFirst({
            where: { id: order_id },
            select: {
                id: true,
                draft: true,
                status: true,
                table_id: true,
                costumer_id: true
            }
        });

        // Busca os itens do pedido com o produto
        const items = await prismaClient.item.findMany({
            where: { order_id },
            include: { product: true }
        });

        // Formata itens adicionando ingredientes e adicionais de cada item
        const formattedItems = await Promise.all(items.map(async (item) => {

            const ingredientes = await prismaClient.items_ingredients.findMany({
                where: { order_id, },
                select: {
                    id: true,
                    adicionado: true,
                    ingredient_product: {
                        select: {
                            ingredient: {
                                select: { name: true }
                            }
                        }
                    }
                }
            });

            const adicionais = await prismaClient.items_additionals.findMany({
                where: { order_id, },
                select: {
                    id: true,
                    adicionado: true,
                    categories_additionals: {
                        select: {
                            additionals: {
                                select: { name: true, price: true }
                            }
                        }
                    }
                }
            });

            return {
                id: item.id,
                product: item.product,
                amount: item.amount,

                ingredientes: ingredientes.map(ing => ({
                    name: ing.ingredient_product.ingredient.name,
                    adicionado: ing.adicionado
                })),

                adicionais: adicionais.map(add => ({
                    name: add.categories_additionals.additionals.name,
                    price: add.categories_additionals.additionals.price,
                    adicionado: add.adicionado
                }))
            };
        }));

        return { order, items: formattedItems };
    }
}

export { DetailOrderService };
