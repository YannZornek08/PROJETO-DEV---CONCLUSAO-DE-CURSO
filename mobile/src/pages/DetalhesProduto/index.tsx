import React, { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes"; // ajuste o caminho
import { api } from "../../services/api";
import { formatarPreco } from "../../components/conversorDeMoeda/valoresEmReal";

type DetalhesRouteProp = RouteProp<StackParamsList, "DetalhesProdutos">;
// RESOLVER A PARTE DOS ADICIONAIS
// O código está buscando os adicionais corretamente, mas não está atualizando o estado quando um adicional é selecionado ou desselecionado.
// O código para atualizar o estado local dos adicionais está comentado, o que impede a atualização visual dos checkboxes.
// Além disso, a chamada à API para atualizar o estado do adicional no backend também está comentada.
// Além disso, quando você tenta adicionar um ingrediente e há mais de um adicional no produto, ele irá atualizar todos os adicionais do produto, não apenas o que foi clicado.
// O código está lendo cada adicional com a key ingredient_product_id, mas ao atualizar, está enviando product_id e ingredient_id, o que pode causar confusão se houver múltiplos adicionais para o mesmo produto.
// O código está lendo as chaves key repetidas
// Além disso, a lógica para enviar os adicionais selecionados ao carrinho ainda não foi implementada.
type Additional = {
  ingredient_product_id: string | null;
  product_id: string | null;
  ingredient_id: string | null;
  product: {
    name: string | null;
  };
  ingredient: {
    name: string | null;
  };
  adicionado: boolean | null;
};

type Item = {
  order_id: string;
  ingredient_product_id: string;
  amount: number;
};

export default function DetalhesProdutos() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<DetalhesRouteProp>();
  const [adicionais, setAdicionais] = useState<Additional[]>([]);
  // const [items, setItems] = useState<Item[]>([]);

  // Imprime aqui os produtos clicados em adicionar
  const { product } = route.params;

  const tamanhos = ["P", "M", "G"];

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("M");
  const [quantidade, setQuantidade] = useState<number>(1);


  useEffect(() => {
    async function verAdicionaisProduto() {
      try {
        //Chama a rota que retorna TODOS os ingredientes do produto
        const response = await api.get('/product/ingredients', {
          params: {
            product_id: product.id,
          }
        });
        console.log("API retornou:", response.data);
        if (!response.data) {
          setAdicionais([]);
          return;
        }
        setAdicionais(Array.isArray(response.data) ? response.data : [response.data]);
        const dataArray = Array.isArray(response.data) ? response.data : [response.data];
        const formattedAdicionais: Additional[] = dataArray.map((item: any) => ({
          ingredient_product_id: item.ingredient_product_id ?? "",
          product_id: item.product_id ?? "",
          ingredient_id: item.ingredient_id ?? "",
          product: {
            name: item.product?.name ?? "",
          },
          ingredient: {
            name: item.ingredient?.name ?? "",
          },
          adicionado: item.adicionado ?? false,
        }));
        setAdicionais(formattedAdicionais);
        console.log("Adicionais formatados:", formattedAdicionais);
        // console.log("É array?", Array.isArray(response.data));
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    verAdicionaisProduto();
  }, [product.id]);

  async function adicionarItem() {
    try {
      const newItem = await api.post('/order/add', {
          order_id: "39abb591-8642-4b4f-81b7-49bfbeb4e246", // Substitua pelo ID real do pedido
          product_id: product.id,
          amount: quantidade,
      });
      console.log("Item adicionado:", newItem.data);
      // setItems((prevItems) => [...prevItems, newItem.data]);
    } catch (err) {
      console.log("Erro ao adicionar item:", err, product.id, quantidade);
    }
  }

  const Menu = () => {
    navigation.navigate("Menu");
  };

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho e imagem do produto */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={Menu}>
            <Image
              source={require('../../assets/Voltar.png')}
              resizeMode="stretch"
              style={styles.smallImage}
            />
          </TouchableOpacity>
          <Image
            source={{
              uri: product.banner,
            }}
            resizeMode={"stretch"}
            style={styles.largeImage}
          />
        </View>

        {/* Nome e preço */}
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatarPreco(Number(product.price))}</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.description}>
          {product.description}
        </Text>

        {/* Divisória */}
        <View style={styles.divider} />

        {/* Adicionais */}
        <View style={styles.adicionaisContainer}>
          {adicionais.length <= 0 ? (
            <Text style={styles.sectionTitle}>Nenhum adicional disponível.</Text>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Adicionais:</Text>
              {adicionais.map((ingred) => (
                // console.log("Renderizando adicional:", ingred.ingredient_product_id),
                <TouchableOpacity
                  key={ingred.ingredient_id}
                  style={styles.adicionalItem}
                // onPress={async () => {

                //   //Atualiza localmente
                //   setAdicionais((prev) =>
                //     prev.map((item) =>
                //       item.ingredient_product_id === ingred.ingredient_product_id
                //         ? { ...item, adicionado: !item.adicionado }
                //         : item
                //     )
                //   );
                //   // Atualiza no banco via API
                //   try {
                //     await api.put(`/additional/update`, {
                //       product_id: ingred.product_id,
                //       ingredient_id: ingred.ingredient_id,
                //     });
                //     console.log("Adicional atualizado com sucesso", ingred, ingred.adicionado);

                //   } catch (err) {
                //     console.log("Erro ao atualizar adicional:", err);
                //   }
                // }}
                >
                  <View
                    style={[
                      styles.checkbox,
                      ingred.adicionado && styles.checkboxSelecionado,
                    ]}
                  >
                    {ingred.adicionado && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.adicionalText}>{ingred.ingredient?.name ?? "Sem adicional"}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>

        {/* Seletor de tamanho */}
        <Text style={styles.sectionTitle}>Tamanho:</Text>
        <View style={styles.sizeContainer}>
          {tamanhos.map((tamanho) => (
            <TouchableOpacity
              key={tamanho}
              onPress={() => setTamanhoSelecionado(tamanho)}
              style={[
                styles.sizeButton,
                tamanhoSelecionado === tamanho && styles.selectedSizeButton,
              ]}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  tamanhoSelecionado === tamanho &&
                  styles.selectedSizeButtonText,
                ]}
              >
                {tamanho}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Área fixa inferior com quantidade e botão de adicionar */}
      <View style={styles.bottomContainer}>
        {/* Seletor de quantidade */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantidade:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              onPress={diminuirQuantidade}
              style={[
                styles.quantityButton,
                quantidade <= 1 && styles.disabledButton,
              ]}
              disabled={quantidade <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantidade}</Text>

            <TouchableOpacity
              onPress={aumentarQuantidade}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
            {/* Valor Somado do produto */}
            {/* <Text style={styles.price}> R${product.price*quantidade}</Text> */}
          </View>
        </View>

        {/* Botão de adicionar */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // Lógica para adicionar ao carrinho
            // Aqui você pode enviar os dados para o backend ou atualizar o estado global
            // Por enquanto, apenas mostramos um alerta
            adicionarItem();
            alert(
              `${product.name} adicionado! Tamanho: ${tamanhoSelecionado}, Quantidade: ${quantidade}, Adicionais: ${adicionais.join(
                ", "
              ) || "Nenhum"}`
            );
            navigation.navigate("Carrinho");
          }}
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  imageContainer: { marginTop: 65, marginBottom: 2, marginHorizontal: 26 },
  smallImage: { width: 32, height: 32, marginBottom: 16 },
  largeImage: { height: 360,
    borderRadius: 180,
  },
  productName: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  priceContainer: { alignItems: "center", marginVertical: 10 },
  price: { color: "#000000", fontSize: 22, fontWeight: "bold" },
  description: {
    color: "#000000ab",
    fontSize: 18,
    marginTop: 8,
    marginHorizontal: 26,
    textAlign: "center",
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#D7C2B8",
    marginVertical: 25,
    marginHorizontal: 46,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 23,
  },
  adicionaisContainer: {
    marginBottom: 25,
    marginLeft: 23,
  },
  adicionalItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#8D4F28",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelecionado: {
    backgroundColor: "#8D4F28",
  },
  checkmark: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  adicionalText: { color: "#000000", fontSize: 16, textTransform: "capitalize" },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  sizeButton: {
    borderWidth: 2,
    borderColor: "#D7C2B8",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
  },
  selectedSizeButton: {
    borderColor: "#8D4F28",
    backgroundColor: "#8D4F28",
  },
  sizeButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },
  selectedSizeButtonText: { color: "#FFFFFF" },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  quantityContainer: { flexDirection: "column" },
  quantityLabel: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 15,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 20
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#D7C2B8",
    backgroundColor: "#8D4F28",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#D7C2B8" },
  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 36,
  },
  quantityText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#8D4F28",
    paddingVertical: 21,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 13,
  },
  addButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
