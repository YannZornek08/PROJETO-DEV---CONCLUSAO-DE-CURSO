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
  adicionado: boolean;
  product: {
    name: string;
    banner: string;
    price: number;
    description: string;
  }
  ingredientes: {
    name: string;
    adicionado: boolean;
  }[];
  adicionais: {
    name: string;
    adicionado: boolean;
    price: number;
  }[];
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
        const basePrice = Number(String(item?.product?.price ?? 0).replace(',', '.')) || 0;

        // soma dos adicionais do item
        const adicionaisTotal = Array.isArray(item.adicionais)
          ? item.adicionais
            .filter((a) => a && a.adicionado)
            .reduce(
              (sum, a) => sum + (Number(String(a.price ?? 0).replace(',', '.')) || 0),
              0
            )
          : 0;

        const totalItem = (basePrice + adicionaisTotal) * (item.amount || 0);
        return somatoria + totalItem;
      }, 0);

      setTotal(soma);
    };

    calcularTotal();
  }, [items]);


  const handlePay = () => {
    Alert.alert(
      "Resumo do Pedido",
      `Mesa: ${mesa}\nNome: ${nome}\nTotal: ${formatarPreco((Number(total)))}\n\nObservações: ${observacoes || "Nenhuma observação adicionada"
      }`
    );
    navigation.navigate("Pagamento")
  };

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
    // If there's no open order, block the cart UI until an order is created/opened
    if (!orderId) {
      setItems([]);
      setBloquearTela(true);
      return;
    }

    async function verPedidos() {
      console.log("Buscando itens do pedido para order_id:", orderId);
      try {
        const response = await api.get('/order/detail', {
          params: { order_id: orderId }
        });
        setItems(response.data.items.filter((item: any) => item.adicionado === true));
        console.log("Itens do pedido:", response.data.items.filter((item: any) => item.adicionado === true));
      } catch (err) {
        console.log("Erro ao buscar itens do pedido:", err);
      }
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
        params: { item_id: item_id }
      });
      console.log("Resposta do backend:", response.data);

      setItems((prev) => prev.filter((item) => item.id !== item_id));
      alert("Item excluído do carrinho.");
    } catch (err) {
      console.log("Erro ao excluir item:", err);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {bloquearTela && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>
              Este pedido precisa ser aberto para adicionar ou remover itens.
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
          <View style={[styles.orderItem, styles.orderCard]} key={item.id}>
            <Image
              source={{ uri: item.product.banner }}
              resizeMode="cover"
              style={styles.orderItemImage}
            />

            <View style={styles.orderItemInfo}>
              <Text style={styles.orderItemTitle}>{item.product.name}</Text>
              <Text style={styles.orderItemDescription} numberOfLines={2} ellipsizeMode="tail">
                {item.product.description}
              </Text>

              <Text style={styles.subHeading}>Ingredientes Removidos</Text>
              {item.ingredientes && item.ingredientes.filter((ing) => ing.adicionado).length > 0 ? (
                item.ingredientes
                  .filter((ing) => ing.adicionado)
                  .map((ing) => (
                    <Text key={ing.name} style={styles.subText}>• {ing.name}</Text>
                  ))
              ) : (
                <Text style={styles.subText}>Nenhum ingrediente removido</Text>
              )}

              <Text style={[styles.subHeading, { marginTop: 6 }]}>Adicionais Adicionados</Text>
              {item.adicionais && item.adicionais.filter((add) => add.adicionado).length > 0 ? (
                item.adicionais
                  .filter((add) => add.adicionado)
                  .map((add) => (
                    <Text key={add.name} style={styles.subText}>• {add.name}{add.price ? ` (+ ${formatarPreco(add.price)})` : ''}</Text>
                  ))
              ) : (
                <Text style={styles.subText}>Nenhum adicional adicionado.</Text>
              )}

              <Text style={styles.subText}>Quantidade: {item.amount}</Text>
            </View>

            <View style={styles.rightColumn}>
              <Text style={styles.orderItemPrice}>
                {(() => {
                  const basePrice = Number(String(item.product?.price ?? 0).replace(',', '.')) || 0;
                  const adicionaisTotal = Array.isArray(item.adicionais)
                    ? item.adicionais
                      .filter((a) => a && a.adicionado)
                      .reduce(
                        (sum, a) => sum + (Number(String(a.price ?? 0).replace(',', '.')) || 0),
                        0
                      )
                    : 0;
                  return formatarPreco((basePrice + adicionaisTotal) * (item.amount || 0));
                })()}
              </Text>
              <TouchableOpacity onPress={() => excluir(item.id)} style={styles.trashButton}>
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

        <TouchableOpacity style={styles.payButton} onPress={() => {
          if (items.length === 0) {
            Alert.alert("Seu carrinho está vazio. Adicione itens antes de pagar.");
            return;
          }
          handlePay();
          // atualizarObservacao();
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
    fontFamily: "BesleyBold",
  },
  orderItemImage: {
    width: 112,
    height: 112,
    marginRight: 27,
    borderRadius: 56,
  },
  orderItemDescription: {
    color: "#000000",
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "BesleyRegular",
    textTransform: "capitalize",
    flexShrink: 1,
  },
  orderItemPrice: {
    color: "#000000",
    fontSize: 16,
    textAlign: "right",
    marginVertical: 6,
    width: 94,
    fontFamily: "BesleyRegular",
  },
  // notesContainer: {
  //   backgroundColor: "#FFFFFF",
  //   borderColor: "#52443C",
  //   borderRadius: 18,
  //   borderWidth: 4,
  //   padding: 12,
  //   marginBottom: 27,
  //   marginHorizontal: 26,
  //   minHeight: 120,
  //   justifyContent: "flex-start",
  // },
  // notesInput: {
  //   color: "#000000",
  //   fontSize: 14,
  //   flex: 1,
  //   padding: 6,
  //   textAlign: "center",
  // },
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
    width: 24,
    height: 24,
    padding: 18,
    borderRadius: 0,
    marginLeft: 64,
    marginTop: 22,
  }
  ,
  /* new layout styles for item card */
  orderCard: {
    backgroundColor: "#FFF8F0",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 18,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  orderItemInfo: {
    flex: 1,
    paddingRight: 8,
  },
  orderItemTitle: {
    fontSize: 18,
    fontFamily: "BesleyBold",
    color: "#000",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    fontFamily: "BesleyBold",
    color: "#423828",
    marginTop: 6,
  },
  subText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "BesleyRegular",
    marginLeft: 6,
  },
  rightColumn: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  trashButton: {
    marginTop: 8,
    padding: 6,
  }
});

export default PedidoScreen;