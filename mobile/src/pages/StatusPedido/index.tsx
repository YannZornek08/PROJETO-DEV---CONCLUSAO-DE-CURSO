import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  ToastAndroid,
  Alert,
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
  status: number | boolean;
  draft: boolean;
  table?: string | null;
  created_at?: string;
  items: Array<{
    id: string;
    amount: number;
    status?: number;
    product?: {
      id?: string;
      name?: string;
      price?: number;
      banner?: string | null;
    };
  }>;
};


//ATUALIZAR STATUS DE CADA ITEM PARA QUE A LISTA SÓ APAREÇA QUANDO OS STATUS DE TODOS OS ITENS ESTIVEREM EM ENTREGUE (3)
// DIREICIONAR O USUÁRIO DIRETO PARA A TELA DE LERQR CODE APÓS LOGAR
export enum OrderStatus {
  PENDENTE = 0,
  PREPARANDO = 1,
  A_CAMINHO = 2,
  ENTREGUE = 3,
}

export interface IOrder {
  id: string;
  status: OrderStatus; // aqui você garante que só pode ser 0–4
  // outros campos do pedido...
}




export default function StatusPedido() {
  const [order, setOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { orderId } = useOrder();
  const { costumerId } = useCostumer();
  const order_id = `order_id=${orderId}`;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const prevOrdersRef = useRef<Order[]>([]);
  const notifiedOrdersRef = useRef<Set<string>>(new Set());

  function isOrderAllDelivered(o: Order) {
    if (!o.items || o.items.length === 0) return false;
    return o.items.every(it => it.status === 3);
  }

  async function verOrderUsuario(id_usuario: string | null) {
    console.log("ID do usuário:", id_usuario);
    if (!id_usuario) {
      console.log("Nenhum ID de usuário fornecido.");
      setOrder([]);
      setLoading(false);
      return;
    }
    // console.log("usuario", id_usuario);
    try {
      setLoading(true);
      const response = await api.get(`/orders/costumer?costumer_id=${id_usuario}`);
      const allOrders = Array.isArray(response.data) ? response.data : [];

      // Mostrar apenas pedidos efetivos (não rascunhos)
      const visible: Order[] = allOrders.filter((ordem: any) => !ordem.draft);

      // detectar mudanças: se um pedido passou a estar entregue, mostrar toast com número e data
      try {
        const prev = prevOrdersRef.current;

        // Se for a primeira vez que carregamos a lista, não devemos disparar toasts
        if (!prev || prev.length === 0) {
          // marcar como notificados os pedidos que já estão entregues para evitar notificações futuras
          visible.forEach(o => { if (isOrderAllDelivered(o)) notifiedOrdersRef.current.add(o.id); });
        } else {
          visible.forEach((newOrd, idx) => {
            const oldOrd = prev.find((p) => p.id === newOrd.id);
            const newDelivered = isOrderAllDelivered(newOrd);
            const oldDelivered = oldOrd ? isOrderAllDelivered(oldOrd) : false;

            // se transição de não entregue -> entregue e ainda não notificado, então notifica
            if (!oldDelivered && newDelivered && !notifiedOrdersRef.current.has(newOrd.id)) {
              const idShort = newOrd.id ? newOrd.id.slice(0, 3).toUpperCase() : `${idx + 1}`;
              const dateLabel = newOrd.created_at ? formatDate(newOrd.created_at) : "";
              const msg = `Pedido ${idShort} entregue${dateLabel ? ` — ${dateLabel}` : ""}`;
              if (Platform.OS === "android") {
                ToastAndroid.show(msg, ToastAndroid.SHORT);
              } else {
                Alert.alert("Pedido entregue", msg);
              }
              notifiedOrdersRef.current.add(newOrd.id);
            }
          });
        }
      } catch (e) {
        // não bloquear em caso de erro na detecção
        console.log("Erro comparando pedidos anteriores:", e);
      }

      setOrder(visible);
      prevOrdersRef.current = visible;
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

  function getOrderStatusLabel(status: number | boolean | undefined) {
    if (typeof status === "boolean") return status ? "Entregue" : "Em preparo";
    switch (status) {
      case OrderStatus.PENDENTE:
        return "Pendente";
      case OrderStatus.PREPARANDO:
        return "Em preparo";
      case OrderStatus.A_CAMINHO:
        return "A caminho";
      case OrderStatus.ENTREGUE:
        return "Entregue";
      default:
        return "Desconhecido";
    }
  }

  function getStatusEmoji(status: number | boolean | undefined) {
    if (typeof status === "boolean") return status ? "✅" : "⏳";
    return status === OrderStatus.ENTREGUE ? "✅" : status === OrderStatus.A_CAMINHO ? "🚚" : "⏳";
  }

  function formatDate(dateStr: string) {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString();
    } catch (e) {
      return dateStr;
    }
  }

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
            // split orders into today and older
            (() => {
              const today = new Date();
              const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

              const todayOrders = order.filter(o => {
                const d = o.created_at ? new Date(o.created_at) : null;
                return d ? d >= startOfToday : false;
              });

              const olderOrders = order.filter(o => {
                const d = o.created_at ? new Date(o.created_at) : null;
                return d ? d < startOfToday : true;
              });

              function renderOrders(list: Order[]) {
                return list.map((ordem, index) => (
                  <View key={ordem.id} style={[styles.card, styles.gap]}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.statusLabel}>Pedido {ordem.id ? ordem.id.slice(0,3).toUpperCase() : index + 1}</Text>
                      <Text style={styles.orderDate}>{ordem.created_at ? formatDate(ordem.created_at) : ''}</Text>
                    </View>

                    {(() => {
                      const orderDelivered = isOrderAllDelivered(ordem);
                      return (
                        <Text style={[styles.statusText, orderDelivered ? styles.ready : styles.progress]}>
                          {getStatusEmoji(orderDelivered)} {getOrderStatusLabel(orderDelivered as any)}
                        </Text>
                      );
                    })()}

                    <Text style={styles.itemsCount}>
                      {ordem.items && ordem.items.length > 0 ? `Itens: ${ordem.items.length}` : "Nenhum item no pedido."}
                    </Text>

                    {ordem.items && ordem.items.length > 0 && (
                      <View style={styles.itemsList}>
                        {ordem.items.map((it) => (
                          <View key={it.id} style={styles.itemRow}>
                            <Text style={styles.itemName}>{it.product?.name ?? 'Item'}</Text>
                            <Text style={styles.itemQty}>x{it.amount}</Text>
                            <View style={styles.itemStatusBadge}>
                              <Text style={styles.itemStatusText}>{getStatusEmoji(it.status)} {getOrderStatusLabel(it.status)}</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ));
              }

              return (
                <>
                  <Text style={styles.sectionTitle}>Pedidos de Hoje</Text>
                  {todayOrders.length > 0 ? renderOrders(todayOrders) : <Text style={styles.emptySection}>Nenhum pedido hoje.</Text>}

                  <View style={styles.divider} />

                  <Text style={styles.sectionTitle}>Pedidos Antigos</Text>
                  {olderOrders.length > 0 ? renderOrders(olderOrders) : <Text style={styles.emptySection}>Nenhum pedido antigo.</Text>}
                </>
              );
            })()
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
  itemsCount: {
    marginTop: 8,
    fontSize: 14,
    color: "#5F4100",
    textAlign: "center",
  },
  itemsList: {
    marginTop: 12,
    width: "100%",
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
  },
  sectionTitle: {
    width: "90%",
    fontSize: 18,
    fontWeight: "700",
    color: "#5F4100",
    marginBottom: 12,
  },
  emptySection: {
    color: "#666",
    marginBottom: 12,
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#E0CFC0",
    marginVertical: 16,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFDF8",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: "#423828",
  },
  itemQty: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 8,
  },
  itemStatusBadge: {
    backgroundColor: "transparent",
  },
  itemStatusText: {
    fontSize: 13,
    color: "#333",
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
