import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
}

class SearchProductService {
    async execute({ name }: ProductRequest) {
        const product = await prismaClient.product.findMany({
            where: {
                name: {
                    contains: name,   // busca parcial
                    mode: "insensitive" // ignora maiúsculas/minúsculas
                }
            },
            select: {
                id: true,
                name: true
            }
        })
        return product
    }
}


export { SearchProductService }


// useEffect(() => {
//     if (textInput1.trim() === "") {
//         setProdutosFiltrados(produtos);
//     } else {
//         const termo = textInput1.toLowerCase();
//         const filtrados = produtos.filter((p) =>
//             p.name.toLowerCase().includes(termo)
//         );
//         setProdutosFiltrados(filtrados);
//     }
// }, [textInput1, produtos]);