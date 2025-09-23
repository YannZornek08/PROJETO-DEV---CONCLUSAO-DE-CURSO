import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { api } from "../../services/api";

type Order = {
  id: string;
  status: boolean;
};

export default function StatusPedido() {
  const [order, setOrder] = useState<Order | null>(null);

  // Colocar a order automático
  const order_id = "order_id=93185418-d623-4343-9529-8ad524f5be45";

  useEffect(() => {
    async function verOrder() {
      try {
        const response = await api.get(`/order/detail?${order_id}`);
        // console.log("Resposta da API:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          // pega o "order" do primeiro item
          const pedido = response.data[0].order;
          setOrder(pedido);
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
    <View>
      {order ? (
        <><Text style={styles.textMain}>Status:</Text>
        <Text style={styles.textH2}> {order.status ? <Text style={styles.true}>"Funcionou (true)"</Text> : <Text style={styles.false}>"Não Funcionou (false)"</Text>} </Text></>
      ) : (
        <Text>Carregando pedido...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create ({
  textMain: {
    textAlign: "center",
    fontSize: 48,
    paddingTop: "50%"
  },
  textH2: {
    textAlign: "center",
    marginTop: 20
  },
  true: {
    color: '#00ff00',
    fontSize: 24,
    textDecorationLine: 'underline',
    textAlign: "center",    
  },
  false: {
    color: '#ff0000',
    fontSize: 24,
    textDecorationLine: 'underline',
  }
})