import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { formatarPreco } from "../../components/conversorDeMoeda/valoresEmReal";
import Order from "../Order";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useOrder } from "../../contexts/OrderContext";

import { OrderAtual } from "../DetalhesProduto";

export type Produto = {
  id: string;
  name: string;
  description: string;
  price: number;
  banner: string;
}

export type Order = {
  id: string;
  status: boolean
}

type ItensPedido = {
  id: string;
  product: {
    name: string;
    banner: string;
    price: number;
  }
  amount: number;
}

const PedidoScreen: React.FC = () => {
  const [observacoes, setObservacoes] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [total, setTotal] = useState(0);
  const [mesa, setMesa] = useState("05");
  const [nome, setNome] = useState("João M.");
  const [items, setItems] = useState<ItensPedido[]>([])
  
  //  REFATORAR, VER OS COMENTÁRIOS NO DETALHES PRODUTOS
  const [orderAtual, setOrderAtual] = useState<OrderAtual | boolean>(Boolean);
  const [bloquearTela, setBloquearTela] = useState(false);
  
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const trash = require('../../assets/trash.png');
  const { orderId } = useOrder();
 
  //   useEffect(() => {

  //   async function verProdutosPedido() {
  //     try {
  //       const response = await api.get('/order/detail');
  //       setProdutos(response.data);
  //     } catch (err) {
  //       console.log("Erro ao buscar produtos:", err);
  //     }
  //   }
  //   verProdutosPedido();
  // }, []);

  useEffect(() => {
    const calcularTotal = () => {
      const soma = items.reduce((somatoria, item) => {
        return somatoria + item.product.price * item.amount;
      }, 0);
      setTotal(soma);
    };

    calcularTotal();
  }, [items]);

  // const handlePay = () => {
  //   Alert.alert(
  //     "Resumo do Pedido",
  //     `Mesa: ${mesa}\nNome: ${nome}\nTotal: ${formatarPreco((Number(total)))}\n\nObservações: ${observacoes || "Nenhuma observação adicionada"
  //     }`
  //   );
  //   navigation.navigate("Pagamento")
  // };

  async function bloquearPedidos() {
    if (!orderId) return;
    try {
      const response = await api.get("/order/detail", {
        params: { order_id: orderId },
      });
      // console.log("Detalhes do pedido para bloqueio:", response.data);
      setOrderAtual(response.data.draft);
      console.log("O draft da order atual é", orderAtual)
      if (response.data.draft == false) {
        console.log("CARRINHO Tem que bloquear a TELA!!")
        setBloquearTela(true);
      } else {
        console.log("CARRINHO Não bloqueia a tela")
        setBloquearTela(false);
      }
    } catch (err) {
      console.log("Erro ao buscar detalhes do pedido:", err);
    }
  }


  useEffect(() => {
    if (!orderId) return;
    async function verPedidos() {
      const response = await api.get('/order/detail', { params: { order_id: orderId } });
      setItems(response.data.items);
    }
    verPedidos();
    bloquearPedidos();
  }, [orderId]);


  function VoltarMenu() {
    navigation.navigate("VoltarMenu")
  }

  async function excluir(item_id: string) {
    Alert.alert("Item excluído do carrinho.");
    console.log("Tentando excluir item:", item_id);
    try {
      const response = await api.delete("/order/remove", {
        params: { item_id }
      });
      console.log("Resposta do backend:", response.data);

      setItems((prev) => prev.filter((item) => item.id !== item_id));
      alert("Item excluído do carrinho.");
    } catch (err) {
      console.log("Erro ao excluir item:", err);
    }
  }

  async function atualizarObservacao() {
    // Alert.alert("Observação atualizada ao item.");
    console.log("Tentando atualizar observação ao item:", orderId);
    try {
      await api.put("/order/note", {
          order_id: orderId, 
          note: observacoes,
      });
      console.log("Resposta do backend: Observação atualizada com sucesso.", observacoes);

      // setItems((prev) => prev.filter((item) => item.id !== item_id));
      // alert("Observação adicionada ao item.");
    } catch (err) {
      console.log("Erro ao adicionar observação ao item:", err);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <TouchableOpacity onPress={VoltarMenu}>
          <Image
            source={require('../../assets/Voltar.png')}
            resizeMode="stretch"
            style={styles.logo}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Pedido</Text>

        {items.map((item) => (
          <View style={styles.orderItem} key={item.id}>
            <Image
              source={{ uri: item.product.banner }}
              resizeMode="stretch"
              style={styles.orderItemImage}
            />
            <Text style={styles.orderItemDescription}>
              {item.product.name}{"\n"}Quantidade: {item.amount}
            </Text>

            {/* Coluna para valor + botão */}
            <View>
              <Text style={styles.orderItemPrice}>
                {formatarPreco(item.product.price * item.amount)}
              </Text>
              <TouchableOpacity onPress={() => excluir(item.id)}>
                <Image source={trash} style={styles.trash} />
              </TouchableOpacity>
            </View>
          </View>
        ))}


        <View>
          {produtos.map((produto) => (
            <View key={produto.id} style={styles.orderItem}>
              <Image
                source={{ uri: produto.banner }}
                resizeMode="stretch"
                style={styles.orderItemImage}
              />
              <Text style={styles.orderItemDescription}>
                {produto.name}{"\n"}{produto.description}
              </Text>
              <Text style={styles.orderItemPrice}>R$ {produto.price}</Text>
            </View>
          ))}
        </View>


        <View style={styles.notesContainer}>
          <TextInput
            style={styles.notesInput}
            placeholder="Toque para adicionar observações:"
            placeholderTextColor="#52443C"
            value={observacoes}
            onChangeText={(text) => {
              setObservacoes(text);
              atualizarObservacao();
            }}

            multiline
            textAlignVertical="top"
          />
        </View>


        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}> {formatarPreco(total)}</Text>
        </View>

        <View style={styles.detailsRow}>
          {/* <Text style={styles.detailLabel}>Mesa:</Text> */}
          {/* <Text style={styles.detailValue}>{mesa}</Text> */}
        </View>

        <View style={styles.detailsRow}>
          {/* <Text style={styles.detailLabel}>Nome:</Text> */}
          {/* <Text style={styles.detailValue}>{nome}</Text> */}
        </View>

        <TouchableOpacity style={styles.payButton} onPress={ () => {
          // handlePay();
          atualizarObservacao();
          }}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 32,
    height: 32,
    marginTop: 65,
    marginBottom: 5,
    marginLeft: 26,
  },
  title: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 24,
    marginHorizontal: 26,
    fontFamily: "BesleyBold",
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 33,
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  orderItemImage: {
    width: 90,
    height: 90,
    marginRight: 27,
    borderRadius: 45,
  },
  orderItemDescription: {
    color: "#000000",
    fontSize: 16,
    marginBottom: 40,
  },
  orderItemPrice: {
    color: "#000000",
    fontSize: 16,
    textAlign: "right",
    marginVertical: 6,
    width: 94,
    fontFamily: "BesleyRegular",
  },
  notesContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#52443C",
    borderRadius: 18,
    borderWidth: 4,
    padding: 12,
    marginBottom: 27,
    marginHorizontal: 26,
    minHeight: 120,
    justifyContent: "flex-start",
  },
  notesInput: {
    color: "#000000",
    fontSize: 14,
    flex: 1,
    padding: 6,
    textAlign: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 26,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 26,
    color: "#000000",
    fontFamily: "BesleyBold",
  },
  totalValue: {
    fontSize: 28,
    color: "#000000",
    fontFamily: "BesleyBold",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 26,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "BesleyRegular",
  },
  detailValue: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "BesleyRegular",
  },
  payButton: {
    alignItems: "center",
    backgroundColor: "#8D4F28",
    borderRadius: 100,
    paddingVertical: 24,
    marginBottom: 35,
    marginTop: 20,
    marginHorizontal: 26,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  trash: {
    backgroundColor: "#FF0000",
    padding: 18,
    borderRadius: 25,
    marginLeft: 45,
  }
});

export default PedidoScreen;