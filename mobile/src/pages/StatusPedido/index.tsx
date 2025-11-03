import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { api } from "../../services/api";
import { useOrder } from "../../contexts/OrderContext";
import { useCostumer } from "../../contexts/CostumerContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import BottomNavBar from "../../components/navButton";

type Order = {
  id: string;
  status: boolean;
  draft: boolean;
  items: Array<{
    id: string;
    name: string;
    amount: number;
    price: number;
  }>;
};

export default function StatusPedido() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [order, setOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { orderId } = useOrder();
  const { costumerId } = useCostumer();
  const order_id = `order_id=${orderId}`;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function verOrderUsuario(id_usuario: string | null) {
    console.log("ID do usuário:", id_usuario);
    if (!id_usuario) {
      console.log("Nenhum ID de usuário fornecido.");
      setOrder([]);
      setLoading(false);
      return;
    }
    console.log("usuario", id_usuario);
    try {
      setLoading(true);
      const response = await api.get(`/orders/costumer?costumer_id=${id_usuario}`);
      console.log("Resposta da API:", response.data);
      const allOrders: Order[] = Array.isArray(response.data) ? response.data : [];

      // Mostrar apenas pedidos efetivos (não rascunhos)
      const visible = allOrders.filter((ordem) => !ordem.draft);
      setOrder(visible);
    } catch (err) {
      console.log("Erro ao buscar orders do usuário:", err);
      setOrder([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verOrderUsuario(costumerId);
    const interval = setInterval(() => {
      verOrderUsuario(costumerId);
    }, 5000);

    return () => clearInterval(interval);
  }, [costumerId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Seus Pedidos Anteriores</Text>

          {loading ? (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size="large" color="#5F4100" />
              <Text style={styles.loadingText}>Carregando pedidos...</Text>
            </View>
          ) : order.length === 0 ? (
            <View style={styles.overlayContent}>
              <Text style={styles.overlayText}>Nenhum pedido encontrado.</Text>
              <TouchableOpacity
                style={styles.overlayButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.overlayButtonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            order.map((ordem, index) => (
              <View key={ordem.id} style={[styles.card, styles.gap]}>
                <Text style={styles.statusLabel}>Pedido {index + 1} está:</Text>
                <Text
                  style={[
                    styles.statusText,
                    ordem.status ? styles.ready : styles.progress,
                  ]}
                >
                  {ordem.status
                    ? "✅ Pronto!"
                    : "⏳ Em Preparo..."}
                  {"\n"}
                  {ordem.items && ordem.items.length > 0
                    ? `Itens: ${ordem.items.length}`
                    : "Nenhum item no pedido."}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <BottomNavBar activeRoute="StatusPedido" />
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
    zIndex: 999,
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
    fontFamily: "BesleyBold",
    color: "#5F4100",
    marginBottom: 30,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#5F4100",
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
  open: {
    color: "#000000",
  },
  progress: {
    color: "#D2691E",
  },
  gap: {
    marginBottom: 20,
  },
});
