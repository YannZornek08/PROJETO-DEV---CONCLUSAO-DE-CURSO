import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button
} from "react-native";

import { api } from "../../services/api";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type Order = {
  id: string;
  status: boolean;
}

export default function StatusPedido() {

  const [order, setOrder] = useState<Order>();

  const order_id = "order_id=93185418-d623-4343-9529-8ad524f5be45"

  useEffect(() => {
    async function verOrder() {
        try {
          const response = await api.get(`/order/detail?${order_id}`);
          console.log("Resposta da API:", response.data); // 👈 olha aqui no console
          setOrder(response.data);
        } catch (err) {
          console.log("Erro ao buscar orders:", err);
        }
      }
      verOrder();
  },[])

  return (
      <View>
    <Text>Telinha</Text>
    {order && (
      <View>
        <Text>{order.id}</Text>
      </View>
    )}
  </View>
  )
}