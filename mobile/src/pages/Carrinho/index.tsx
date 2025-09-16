import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

const PedidoScreen: React.FC = () => {
  const [observacoes, setObservacoes] = useState("");
  const [total, setTotal] = useState("R$ 77,00");
  const [mesa, setMesa] = useState("05");
  const [nome, setNome] = useState("João M.");

   const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const handlePay = () => {
    Alert.alert(
      "Resumo do Pedido",
      `Mesa: ${mesa}\nNome: ${nome}\nTotal: ${total}\n\nObservações: ${
        observacoes || "Nenhuma observação adicionada"
      }`
    );
  };

  function VoltarMenu (){
    navigation.navigate ("VoltarMenu")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={VoltarMenu}>
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/1oa02iuz_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={styles.logo}
        />
        </TouchableOpacity>

        <Text style={styles.title}>Pedido</Text>

        <View style={styles.orderItem}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/icrlbyc3_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.orderItemImage}
          />
          <Text style={styles.orderItemDescription}>
            Pizza de Abacaxi{"\n"}Tamanho: S
          </Text>
          <Text style={styles.orderItemPrice}>R$ 35,00</Text>
        </View>

        <View style={styles.orderItem}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/26f7t1z2_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.orderItemImage}
          />
          <Text style={styles.orderItemDescription}>
            Pizza de Pepperoni{"\n"}Tamanho: M
          </Text>
          <Text style={styles.orderItemPrice}>R$ 42,00</Text>
        </View>

        {/* Campo de observações visível (mas não aparece no resumo) */}
        <View style={styles.notesContainer}>
          <TextInput
            style={styles.notesInput}
            placeholder="Toque para adicionar observações:"
            placeholderTextColor="#52443C"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Total / Mesa / Nome — igual ao modelo (sem exibir observações aqui) */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>{total}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Mesa:</Text>
          <Text style={styles.detailValue}>{mesa}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Nome:</Text>
          <Text style={styles.detailValue}>{nome}</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 32,
    height: 32,
    marginTop: 65,
    marginBottom: 5,
    marginLeft: 26,
  },
  title: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 24,
    marginHorizontal: 26,
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 33,
  },
  orderItemImage: {
    width: 90,
    height: 90,
    marginRight: 27,
  },
  orderItemDescription: {
    color: "#000000",
    fontSize: 14,
    marginTop: 14,
    flex: 1,
  },
  orderItemPrice: {
    color: "#000000",
    fontSize: 14,
    textAlign: "right",
    marginVertical: 6,
    width: 94,
  },
  notesContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#52443C",
    borderRadius: 18,
    borderWidth: 4,
    padding: 12,
    marginBottom: 27,
    marginHorizontal: 26,
    minHeight: 120,
    justifyContent: "flex-start",
  },
  notesInput: {
    color: "#000000",
    fontSize: 14,
    flex: 1,
    padding: 6,
    textAlign: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 26,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 26,
    color: "#000000",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 28,
    color: "#000000",
    fontWeight: "700",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 26,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: "#000000",
  },
  detailValue: {
    fontSize: 16,
    color: "#000000",
  },
  payButton: {
    alignItems: "center",
    backgroundColor: "#8D4F28",
    borderRadius: 100,
    paddingVertical: 24,
    marginBottom: 35,
    marginTop: 20,
    marginHorizontal: 26,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
});

export default PedidoScreen;
