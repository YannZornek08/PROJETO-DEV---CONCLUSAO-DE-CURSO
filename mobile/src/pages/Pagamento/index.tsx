import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import BackButton from "../../components/cart";
import { useOrder } from "../../contexts/OrderContext";
import { api } from "../../services/api";

export async function fazPagamento(id_order: string | null, id_mtdo_pagto: string) {
  console.log("Iniciando pagamento para o pedido:", id_order, "com método de pagamento:", id_mtdo_pagto);
  if (!id_order) {
    console.log("ID do pedido é nulo. Não é possível processar o pagamento.");
    return;
  }
  try {
    await api.post("/payments", {
      order_id: id_order,
      mtdo_pagto_id: id_mtdo_pagto
    })
  } catch (err) {
    console.log("Não foi possível pagar o seu pedido", err)
  }
}

export async function enviarOrder(id_order: string | null) {
  try {
    await api.put("/order/send", {
      order_id: id_order
    });
  } catch (err) {
    console.log("Deu erro ao finalizar o draft", err)
  }
}


const Pagamento: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();


  const Carrinho = () => {
    navigation.navigate("Carrinho");
  };

  const { orderId } = useOrder();

  React.useEffect(() => {
    console.log("Order ID no Pagamento:", orderId);
  }, [orderId]);
  
  const chamarGarcom = () => {
    fazPagamento(orderId, "075e53d7-bf47-4bb8-9b34-aed0c7ffee46")
    enviarOrder(orderId)

    Alert.alert('Atenção', 'Um garçom foi chamado para sua mesa.', [{ text: 'OK' }]);
    navigation.navigate("StatusPedido");
  }

  // const realizarPagamento = async () => {
  //   try {
  //     const response = fazPagamento(orderId)

  //     if (!response) throw new Error("Erro no pagamento");

  //     const data = await response;
  //     console.log("Pagamento concluído:", data);

  //     Alert.alert(
  //       "Pedido Finalizado",
  //       "Deseja pedir algo mais?",
  //       [
  //         {
  //           text: "Não",
  //           onPress: () => navigation.navigate("StatusPedido"),
  //           style: "cancel",
  //         },
  //         {
  //           text: "Sim",
  //           onPress: () => navigation.navigate("Menu"),
  //         },
  //       ],
  //       { cancelable: false }
  //     );

  //   } catch (error) {
  //     console.log("Erro ao processar pagamento:", error);
  //     Alert.alert("Erro", "Não foi possível concluir o pagamento.");
  //   }
  // };

  const resetOrder = useOrder().resetOrder; // Reseta o pedido após o pagamento

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <BackButton to="Menu" />

        <Text style={styles.title}>Pagamento</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.card} onPress={() => {
            navigation.navigate("DadosPagamento", {
              id_mtdo_pagto: "a426119c-ab98-4f63-a3ab-862d20c50575"
            })
          }}>
            <Text style={styles.cardText}>
              Crédito
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => {
            navigation.navigate("DadosPagamento", {
              id_mtdo_pagto: "12de1465-f771-4689-a35a-52bf68f09403"
            })
          }}>
            <Text style={styles.cardText}>
              Débito
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.card} onPress={() => {
          navigation.navigate("DadosPagamento", {
            id_mtdo_pagto: "423d20b1-c022-4951-89f0-3795c3319bb9"
          })
        }}>
          <Text style={styles.cardText}>
            Pix
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <TouchableOpacity style={styles.rowCard} onPress={() => {
            chamarGarcom
            resetOrder
            navigation.navigate("StatusPedido");
          }}>
            <View style={styles.rowContent}>
              <Image
                source={require('../../assets/person_alert_24dp_8D4E27_FILL0_wght400_GRAD0_opsz24.png')}
                resizeMode="stretch"
                style={styles.icon}
              />
              <Text style={styles.textPrimary}>Chamar um garçom</Text>
            </View>
            <Image
              source={require('../../assets/faz03frq_expires_30_days.png')}
              resizeMode="stretch"
              style={styles.iconSmall}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );


};

export default Pagamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F5",
    borderColor: "#D7C2B8",
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: 12,
    marginBottom: 12,
    marginTop: 16,
    paddingVertical: 24,
  },
  subtitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  rowContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  textPrimary: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#52443C",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#FDD5BF",
    borderRadius: 16,
    paddingVertical: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  fullWidthCard: {
    marginTop: 0,
    alignSelf: "stretch",
  },
  cardText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
