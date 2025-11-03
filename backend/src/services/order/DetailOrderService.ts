import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailRequest) {

        const order = await prismaClient.order.findFirst({
            where: { id: order_id },
            select: {
                id: true,
                draft: true,
                status: true,
            }
        });

        if (!order) {
            throw new Error("Pedido não encontrado");
        }

        
        const item_ingredient = await prismaClient.items_ingredients.findMany({
            where: { order_id },
            select: {
                id: true,
                adicionado: true,
                ingredient_product: {
                    select: {
                        ingredient: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        
        const item_additional = await prismaClient.items_additionals.findMany({
            where: { order_id },
            select: {
                id: true,
                adicionado: true,
                categories_additionals: {
                    select: {
                        additionals: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        const items = await prismaClient.item.findMany({
            where: { order_id },
            include: {
                product: true,
            }
        });
        
        const formattedItems = items.map(item => ({
            id: item.id,
            product: item.product,
            amount: item.amount,

            ingredientes: item_ingredient.map(ing => ({
                name: ing.ingredient_product.ingredient.name,
                adicionado: ing.adicionado
            })),

            adicionais: item_additional.map(add => ({
                name: add.categories_additionals.additionals.name,
                adicionado: add.adicionado
            }))
        }));

        return { order, items: formattedItems };
    }
}

export { DetailOrderService }

// const itemsWithDetails = await Promise.all(items.map(async (item) => {
//   const items_ingredients = await prismaClient.items_ingredients.findMany({
//     where: { order_id: order_id, item_id: item.id },
//     include: {
//       ingredient_product: {
//         include: {
//             ingredient: true
//         }
//       }
//     }
//   });
//     const items_additionals = await prismaClient.items_additionals.findMany({
//     where: { order_id: order_id, item_id: item.id },
//     include: {
//       categories_additionals: {
//         include: {
//             additionals: true
//         }
//       }
//     }
//   });
//     return {
//     ...item,
//     items_ingredients,
//     items_additionals
//   };
// }));