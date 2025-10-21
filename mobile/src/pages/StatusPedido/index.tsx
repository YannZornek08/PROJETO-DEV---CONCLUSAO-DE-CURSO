import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Animated, 
  Easing, 
  SafeAreaView 
} from "react-native";
import { api } from "../../services/api";
import { useOrder } from "../../contexts/OrderContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import BottomNavBar from "../../components/navButton";

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

  async function verOrder() {
    if(!orderId) {
      setLoading(false);
      console.log("Nenhuma order existente encontrado.");
      return;
    }
    try {
      const response = await api.get(`/order/detail?${order_id}`);
      console.log("Resposta da API:", response.data);
      if (response.data.items.length > 0) {
        if (response.data.draft === true) {
          setOrder(null);
          setLoading(false);
          return;
        }

        setOrder(response.data);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      }
    } catch (err) {
      console.log("Erro ao buscar orders:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verOrder();
    const interval = setInterval(() => {
      verOrder();
    }, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#5F4100" />
          <Text style={styles.loadingText}>Carregando informações do pedido...</Text>
        </View>
        <BottomNavBar activeRoute="StatusPedido" />
      </SafeAreaView>
    );
  }

  if (order === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Status do Pedido</Text>
          <View style={styles.card}>
            <Text style={styles.statusLabel}>O pedido ainda não foi finalizado ou criado</Text>
            <Text style={[styles.statusText, styles.progress]}>
              Termine e pague seu pedido para ver o andamento
            </Text>
          </View>
        </View>
        <BottomNavBar activeRoute="StatusPedido" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
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
      </View>
      <BottomNavBar activeRoute="StatusPedido" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EBDD",
  },
  centerContent: {
    flex: 1,
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
});