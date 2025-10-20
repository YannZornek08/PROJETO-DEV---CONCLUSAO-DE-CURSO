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

export async function fazPagamento(
  id_order: string | null,
  id_mtdo_pagto: string,
  navigation?: any,
  setOrderId?: (id: string) => void
) {
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

 
    if (navigation && setOrderId) {
      Alert.alert(
        "Pedido Finalizado",
        "Deseja pedir algo mais?",
        [
          {
            text: "Não",
            onPress: async () => {
              try {
                await enviarOrder(id_order);
                navigation.navigate("StatusPedido");
              } catch (err) {
                console.log('Erro ao finalizar a comanda:', err);
                Alert.alert('Erro', 'Não foi possível finalizar a comanda.');
              }
            },
            style: "cancel",
          },
          {
            text: "Sim",
              onPress: async () => {
              try {
                // fechar a comanda atual antes de abrir uma nova
                const closed = await enviarOrder(id_order);
                console.log('Resposta do envio (fechar) da comanda:', closed);
                if (!closed || (closed && closed.draft !== false)) {
                  console.log('A comanda não foi fechada corretamente, abortando criação de nova comanda');
                  Alert.alert('Erro', 'Não foi possível fechar a comanda atual. Por favor tente novamente.');
                  return;
                }

                const detailResp = await api.get('/order/detail', { params: { order_id: id_order } });
                const orderDetail = detailResp.data;
                const table_id = orderDetail.table_id;
                const costumer_id = orderDetail.costumer_id;

              
                const createResp = await api.post('/order', { table_id, costumer_id });
                const newOrderId = createResp.data.id;
                setOrderId(newOrderId);
                navigation.navigate('Menu');
              } catch (err) {
                console.log('Erro ao criar nova comanda a partir da atual', err);
                Alert.alert('Erro', 'Não foi possível abrir nova comanda.');
              }
            },
          },
        ],
        { cancelable: false }
      );
    }

  } catch (err) {
    console.log("Não foi possível pagar o seu pedido", err)
  }
}

export async function enviarOrder(id_order: string | null) {
  try {
    const resp = await api.put("/order/send", { order_id: id_order });
    return resp.data;
  } catch (err) {
    console.log("Deu erro ao finalizar o draft", err);
    throw err;
  }
}


const Pagamento: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();


  const Carrinho = () => {
    navigation.navigate("Carrinho");
  };

  const { orderId, resetOrder } = useOrder();

  React.useEffect(() => {
    console.log("Order ID no Pagamento:", orderId);
  }, [orderId]);
  
  const chamarGarcom = async () => {
    try {
      await fazPagamento(orderId, "075e53d7-bf47-4bb8-9b34-aed0c7ffee46");
      await enviarOrder(orderId);
      Alert.alert('Atenção', 'Um garçom foi chamado para sua mesa.', [{ text: 'OK' }]);
      navigation.navigate("StatusPedido");
    } catch (err) {
      console.log('Erro ao chamar garçom:', err);
      Alert.alert('Erro', 'Não foi possível chamar o garçom.');
    }
  }

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
              id_mtdo_pagto: "9648814d-726c-4c9b-8b2e-440da4da29da"
            })
          }}>
            <Text style={styles.cardText}>
              Crédito
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => {
            navigation.navigate("DadosPagamento", {
              id_mtdo_pagto: "a2511906-b547-4624-916c-b5fb42df972e"
            })
          }}>
            <Text style={styles.cardText}>
              Débito
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.card} onPress={() => {
          navigation.navigate("DadosPagamento", {
            id_mtdo_pagto: "5939de73-70b2-44c0-97c7-1bdf6bd91fd4"
          })
        }}>
          <Text style={styles.cardText}>
            Pix
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <TouchableOpacity style={styles.rowCard} onPress={async () => {
            await chamarGarcom();
            try { resetOrder(); } catch (e) { /* ignored */ }
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
