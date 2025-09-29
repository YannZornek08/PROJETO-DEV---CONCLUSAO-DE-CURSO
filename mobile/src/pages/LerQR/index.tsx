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

  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function confirmarComanda() {
    try {
      const response = await api.post("/order", {
        table_id: "3e9959e3-87a3-4d4a-b112-d7d55183d4b1",
        costumer_id: "b57d8730-2b15-4573-8d9f-661fcdb986e8",
      });

      console.log("Order criada:", response.data);
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
