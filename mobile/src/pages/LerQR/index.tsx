import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import BottomNavBar from "../../components/navButton";
import { useOrder } from "../../contexts/OrderContext"; 

type RouteDetailParams = {
  Order: {
    table_id: string;
    costumer_id: string;
  };
};

type OrderRouterProps = RouteProp<RouteDetailParams, "Order">;

export default function AutenticacaoComanda() {
  const route = useRoute<OrderRouterProps>();
  const [codigo, setCodigo] = useState<string>("");
  const { setOrderId } = useOrder();

  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function confirmarComanda() {
  try {
    // Alterar toda vez o id.
    const response = await api.post("/order", {
      table_id: '3f018ff9-8ffc-4b68-b6a0-d6a6f7143616',
      costumer_id: '99efaf19-e2b8-41f0-9cd6-f692757dff9f',
    });

      console.log("Order criada:", response.data);
      setOrderId(response.data.id);

    } catch (err: any) {
      console.error(
        "Erro ao criar order:",
        err.response?.data || err.message || err
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Autenticar Comanda</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Código da Comanda:</Text>

          <TextInput
            style={styles.input}
            placeholder="Exemplo: 1234"
            placeholderTextColor="#8B8B8B"
            keyboardType="numeric"
            value={codigo}
            onChangeText={setCodigo}
          />

          <TouchableOpacity style={styles.botao} onPress={confirmarComanda}>
            <Text style={styles.textoBotao}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.link}>Problemas? Fale com o atendente!</Text>
      </View>

      {/* Usa o componente do Navbar */}
      <BottomNavBar activeRoute="LerQR"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FDF5F3", // cor de fundo do card
    borderRadius: 10,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  input: {
    backgroundColor: "#F5E6E1", // cor do input
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    borderColor: "#E0CFC9",
    borderWidth: 1,
  },
  botao: {
    backgroundColor: "#8B4B26", // cor do botão
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
});
