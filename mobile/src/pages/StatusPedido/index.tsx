import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Animated, Easing } from "react-native";
import { api } from "../../services/api";

type Order = {
  id: string;
  status: boolean;
};

export default function StatusPedido() {
  const [order, setOrder] = useState<Order | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // animação do status

  const order_id = "order_id=ef3a4cac-80bc-49e9-932c-f07d88ab7732";

  useEffect(() => {
    async function verOrder() {
      try {
        const response = await api.get(`/order/detail?${order_id}`);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const pedido = response.data[0].order;
          setOrder(pedido);

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
      }
    }
    verOrder();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status do Pedido</Text>

      {order ? (
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: order.status ? "#B9FBC0" : "#FFD6A5", opacity: fadeAnim },
          ]}
        >
          <Text style={styles.statusLabel}>Seu pedido está:</Text>
          <Text style={[styles.statusText, order.status ? styles.ready : styles.progress]}>
            {order.status ? "✅ Pronto!" : "⌛ Em Andamento..."}
          </Text>
        </Animated.View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5F4100" />
          <Text style={styles.loadingText}>Carregando informações do pedido...</Text>
        </View>
      )}
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
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#5F4100",
  },
});
