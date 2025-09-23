import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";

// Enum para os status dos pedidos
enum OrderStatus {
  FEITO = "feito",
  PREPARANDO = "preparando",
  PRONTO = "pronto",
  ENTREGUE = "entregue"
}

// Interface para o tipo de pedido
interface Pedido {
  id: string;
  numero: string;
  status: OrderStatus;
  itens?: string[];
}

const PedidoStatus: React.FC = () => {
  // Array de pedidos - você pode buscar isso de uma API
  const pedidos: Pedido[] = [
    {
      id: "1",
      numero: "#" + "12345",
      status: OrderStatus.PREPARANDO,
      //ABAIXO: AUTOMATIZAR ITENS DO PEDIDO
      itens: [" "]
    },
    {
      id: "2",
      numero: "#12346",
      status: OrderStatus.PRONTO,
      //ABAIXO: AUTOMATIZAR ITENS DO PEDIDO
      itens: [""]
    },
    {
      id: "3",
      numero: "#12347",
      status: OrderStatus.FEITO,
      //ABAIXO: AUTOMATIZAR ITENS DO PEDIDO
      itens: [""]
    },
    {
      id: "4",
      numero: "#12348",
      status: OrderStatus.PREPARANDO,
      //ABAIXO: AUTOMATIZAR ITENS DO PEDIDO
      itens: [""]
    },
    {
      id: "5",
      numero: "#12349",
      status: OrderStatus.ENTREGUE,
      //ABAIXO: AUTOMATIZAR ITENS DO PEDIDO
      itens: [""]
    },
  ];

  // Filtrar apenas pedidos que estão sendo preparados ou prontos
  const pedidosVisiveis = pedidos.filter(
    pedido => pedido.status === OrderStatus.PREPARANDO || 
              pedido.status === OrderStatus.PRONTO
  );

  // Função para renderizar o card de status de cada pedido
  const renderPedidoCard = (pedido: Pedido) => {
    const isPronto = pedido.status === OrderStatus.PRONTO;
    
    return (
      <View key={pedido.id} style={styles.card}>
        {/* Número do pedido */}
        <Text style={styles.pedidoNumero}>Pedido {pedido.numero}</Text>
        
        {/* Itens do pedido (opcional) */}
        {pedido.itens && pedido.itens.length > 0 && (
          <Text style={styles.pedidoItens}>
            {pedido.itens.join(", ")}
          </Text>
        )}

        {/* Status do pedido */}
        <View style={styles.statusContainer}>
          {/* Etapa 1: Pedido feito */}
          <View style={styles.step}>
            <View style={styles.circleActive} />
            <Text style={styles.stepTextActive}>Pedido feito</Text>
          </View>

          {/* Linha entre etapas */}
          <View style={isPronto ? styles.lineActive : styles.line} />

          {/* Etapa 2: Status final */}
          <View style={styles.step}>
            <View style={isPronto ? styles.circleActive : styles.circleInProgress} />
            <Text style={isPronto ? styles.stepTextActive : styles.stepTextInProgress}>
              {isPronto ? "Pedido pronto" : "Preparando pedido"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require('../../assets/m00a02ov_expires_30_days.png')}
          resizeMode="cover"
          style={styles.banner}
        >
          <Text style={styles.greeting}>Pedidos</Text>
        </ImageBackground>

        {/* Renderizar cards de pedidos visíveis */}
        {pedidosVisiveis.length > 0 ? (
          pedidosVisiveis.map(pedido => renderPedidoCard(pedido))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Nenhum pedido em preparo no momento
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PedidoStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  banner: {
    paddingTop: 80,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 160,
  },
  card: {
    backgroundColor: "#FFF8F5",
    borderColor: "#D7C2B8",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  pedidoNumero: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8D4F28",
    marginBottom: 8,
  },
  pedidoItens: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    fontStyle: "italic",
  },
  statusContainer: {
    marginTop: 8,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#D7C2B8",
    marginRight: 12,
  },
  circleActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#8D4F28",
    marginRight: 12,
  },
  circleInProgress: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#F0A774",
    marginRight: 12,
  },
  line: {
    height: 32,
    width: 2,
    backgroundColor: "#D7C2B8",
    marginLeft: 8,
    marginVertical: 4,
  },
  lineActive: {
    height: 32,
    width: 2,
    backgroundColor: "#8D4F28",
    marginLeft: 8,
    marginVertical: 4,
  },
  stepText: {
    fontSize: 16,
    color: "#999",
  },
  stepTextActive: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  stepTextInProgress: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F0A774",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 48,
    marginHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});