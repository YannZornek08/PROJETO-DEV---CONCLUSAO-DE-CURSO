import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Animated, Easing, TouchableOpacity, Image } from "react-native";
import { api } from "../../services/api";
import { useOrder } from "../../contexts/OrderContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type Order = {
  id: string;
  status: boolean;
  draft: boolean;
};

export default function StatusPedido() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useOrder();
  const order_id = `order_id=${orderId}`;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  
  const Menu = () => {
    navigation.navigate("Menu");
  };
  
  // função para buscar status do pedido
  async function verOrder() {
    try {
      const response = await api.get(`/order/detail?${order_id}`);
      // console.log("resultado", response.data)

      // if (Array.isArray(response.data.items) && response.data.items.length > 0) {

      if (response.data.items.length > 0) {

        // const pedido = response.data.orders.draft
        // console.log(response.data.orders.draft)
        // console.log("entrou 2 verificação")

        // Se o pedido ainda for um rascunho, não permite visualizar
        if (response.data.orders.draft === true) {
          setOrder(null);
          setLoading(false);
          // console.log("entrou 3 verificação")
          return;
        }

        setOrder(response.data.orders);
        // console.log(order)

        // inicia animação suave
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      } else {
        console.log("Nenhum item encontrado para esse pedido.");
      }
    } catch (err) {
      console.log("Erro ao buscar orders:", err);
    } finally {
      setLoading(false);
    }
  }

  // atualiza o status automaticamente a cada 5 segundos
  useEffect(() => {
    console.log(orderId)
    verOrder(); // busca inicial

    const interval = setInterval(() => {
      verOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5F4100" />
        <Text style={styles.loadingText}>Carregando informações do pedido...</Text>
      </View>
    );
  }

  // Caso o pedido ainda seja um rascunho (draft = true)
  if (order === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Status do Pedido</Text>
        <View style={styles.card}>
          <Text style={styles.statusLabel}>O pedido ainda não foi finalizado.</Text>
          <Text style={[styles.statusText, styles.progress]}> Pague seu pedido para ver o andamento</Text>
        </View>
        <TouchableOpacity onPress={Menu}>
          <Image
            source={require('../../assets/SetaDireitaWhite.png')}
            resizeMode="stretch"
            style={styles.smallImage}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // Caso o pedido já tenha sido finalizado
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status do Pedido</Text>

      <Animated.View
        style={[
          styles.card,
          { backgroundColor: order?.status ? "#B9FBC0" : "#FFD6A5", opacity: fadeAnim },
        ]}
      >
        <Text style={styles.statusLabel}>Seu pedido está:</Text>
        <Text style={[styles.statusText, order?.status ? styles.ready : styles.progress]}>
          {order?.status ? "✅ Pronto!" : "⌛ Em Andamento..."}
        </Text>
      </Animated.View>
      <TouchableOpacity onPress={Menu}>
        <Image
          source={require('../../assets/SetaDireitaWhite.png')}
          resizeMode="stretch"
          style={styles.smallImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EBDD",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#5F4100",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    width: "90%",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    backgroundColor: "#FFF3E0",
  },
  statusLabel: {
    fontSize: 20,
    color: "#423828",
    marginBottom: 10,
    textAlign: "center",
  },
  statusText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  ready: {
    color: "#008000",
  },
  progress: {
    color: "#D2691E",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#5F4100",
  },
  smallImage: { 
    backgroundColor: '#765948',
    width: 32, 
    height: 32, 
    borderRadius: 16,
    padding: 40,
    marginTop: 120,
  },
  
});
