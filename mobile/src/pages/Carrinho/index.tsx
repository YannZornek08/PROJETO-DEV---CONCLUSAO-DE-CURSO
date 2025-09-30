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
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

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
  
  const handlePay = () => {
    Alert.alert(
      "Resumo do Pedido",
      `Mesa: ${mesa}\nNome: ${nome}\nTotal: ${total}\n\nObservações: ${observacoes || "Nenhuma observação adicionada"
      }`
    );
    navigation.navigate("Pagamento")
  };

  useEffect(() => {
    async function verPedidos() {
      try {
        const response = await api.get('/order/detail', {
          params: { 
            order_id: "39abb591-8642-4b4f-81b7-49bfbeb4e246" 
          }
        });
        setItems(response.data);
        // console.log("Produtos no carrinho:", response.data);
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    verPedidos();
  }, []);

  function VoltarMenu() {
    navigation.navigate("VoltarMenu")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <View style={styles.orderItem}
          key={item.id}>
            <Image
              source={{ uri: item.product.banner
              }}
              resizeMode="stretch"
              style={styles.orderItemImage}
            />
            <Text style={styles.orderItemDescription}>
              {item.product.name}{"\n"}Quantidade: {item.amount}
            </Text>
            <Text style={styles.orderItemPrice}>{formatarPreco(item.product.price*item.amount)}</Text>
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
        {/* Campo de observações visível (mas não aparece no resumo) */}
        < View style={styles.notesContainer} >
          <TextInput
            style={styles.notesInput}
            placeholder="Toque para adicionar observações:"
            placeholderTextColor="#52443C"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Total / Mesa / Nome — igual ao modelo (sem exibir observações aqui) */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}> {formatarPreco(total)}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Mesa:</Text>
          <Text style={styles.detailValue}>{mesa}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Nome:</Text>
          <Text style={styles.detailValue}>{nome}</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
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
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 33,
  },
  orderItemImage: {
    width: 90,
    height: 90,
    marginRight: 27,
  },
  orderItemDescription: {
    color: "#000000",
    fontSize: 14,
    marginTop: 14,
    flex: 1,
  },
  orderItemPrice: {
    color: "#000000",
    fontSize: 14,
    textAlign: "right",
    marginVertical: 6,
    width: 94,
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
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 28,
    color: "#000000",
    fontWeight: "700",
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
  },
  detailValue: {
    fontSize: 16,
    color: "#000000",
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
});

export default PedidoScreen;