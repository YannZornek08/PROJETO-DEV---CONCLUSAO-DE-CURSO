import React, { useEffect, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { formatarPreco } from "../../components/conversorDeMoeda/valoresEmReal";
import { useOrder } from "../../contexts/OrderContext";


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

export type OrderAtual = {
  id: string;
  draft: boolean;
}

export default function DetalhesProdutos() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<DetalhesRouteProp>();
  const [adicionais, setAdicionais] = useState<Additional[]>([]);
  
  //REFATORAR DEPOIS PARA QUE AS VARIAVEIS SEJAM EXPORTADAS AO CARRINHO
  const [bloquearTela, setBloquearTela] = useState(false);
  const [orderAtual, setOrderAtual] = useState<OrderAtual | boolean>(Boolean);
  // const [items, setItems] = useState<Item[]>([]);

  const { product } = route.params;
  const order_id = "e7611b30-2756-4346-9305-2bf30495c238";

  //CODIGO DO COPILOT
  // const order_id = route.params?.order_id ?? null;
  // console.log("Produto selecionado:", product);
  // console.log("Order ID:", order_id);

  // const tamanhos = ["P", "M", "G"];
  // const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("M");
  const [quantidade, setQuantidade] = useState<number>(1);

  const { orderId } = useOrder();

  //REFATORAR DEPOIS PARA QUE A FUNÇÃO SEJA EXPORTADA AO CARRINHO
  async function bloquearPedidos() {
    if (!orderId) return;
    try {
      const response = await api.get("/order/detail", {
        params: { order_id: orderId },
      });
      setOrderAtual(response.data.orders.draft);
      console.log("O id do pedido atual é", orderId)
      if (response.data.orders.draft == false) {
        console.log("DETALHES PRODUTOS Tem que bloquear a TELA!!")
        setBloquearTela(true);
      } else {
        console.log("DETALHES PRODUTOS Não bloqueia a tela")
        setBloquearTela(false);
      }
    } catch (err) {
      console.log("Erro ao buscar detalhes do pedido:", err);
    }
  }

  useEffect(() => {
    bloquearPedidos();
  }, [orderId]);

  async function adicionarItem() {
    try {
      const newItem = await api.post('/order/add', {
        order_id: orderId,
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

  const aumentarQuantidade = () => setQuantidade(quantidade + 1);
  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
  {/* //REFATORAR DEPOIS PARA QUE O BLOCO DE CÓDIGO SEJA EXPORTADO AO CARRINHO */}
      {bloquearTela && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>
              Este pedido já foi finalizado e não pode ser editado.
            </Text>

            <TouchableOpacity
              style={styles.overlayButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.overlayButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho e imagem */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={Menu}>
            <Image
              source={require('../../assets/Voltar.png')}
              resizeMode="stretch"
              style={styles.smallImage}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: product.banner }}
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
        <Text style={styles.description}>{product.description}</Text>

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
        {/* <Text style={styles.sectionTitle}>Tamanho:</Text> */}
        {/* <View style={styles.sizeContainer}>
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
        </View> */}
      </ScrollView>

      {/* Área inferior */}
      < View style={styles.bottomContainer} >
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

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // Lógica para adicionar ao carrinho
            // Aqui você pode enviar os dados para o backend ou atualizar o estado global
            // Por enquanto, apenas mostramos um alerta
            if (!orderId) {
              alert("Erro: Nenhum pedido ativo. Por favor, inicie um pedido antes de adicionar itens.");
              return;
            } else {
              adicionarItem();
              // alert(
                // `${product.name} adicionado! Tamanho: ${tamanhoSelecionado}, Quantidade: ${quantidade}, Adicionais: ${adicionais.join(
                  // ", "
                // ) || "Nenhum"}`
              // );
              navigation.navigate("Carrinho");
            }
          }
          }
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // cobre tudo
  },
  overlayContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 30,
    width: "80%",
    alignItems: "center",
    elevation: 10,
  },
  overlayTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8D4F28",
    marginBottom: 10,
  },
  overlayText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  overlayButton: {
    backgroundColor: "#8D4F28",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  overlayButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  imageContainer: { marginTop: 65, marginBottom: 2, marginHorizontal: 26 },
  smallImage: { width: 32, height: 32, marginBottom: 16 },
  largeImage: {
    height: 360,
    borderRadius: 180,
  },
  productName: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "BesleyBold",
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
    marginLeft: 0,
  },
  adicionalItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginLeft: 23,
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
  adicionalText: {
    color: "#000000",
    fontSize: 16,
    textTransform: "capitalize",
  },
  toggleButton: {
    backgroundColor: "#8D4F28",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 99,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  toggleButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 8,
  },
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
    marginBottom: 20,
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