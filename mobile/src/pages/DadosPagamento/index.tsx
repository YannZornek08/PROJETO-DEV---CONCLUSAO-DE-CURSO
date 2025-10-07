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
  TextInput, // 🔹 Importando TextInput
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

const Dados: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [cpf, setCpf] = useState(""); // 🔹 Estado para armazenar o valor digitado

  const Menu = () => {
    if (!cpf) {
      Alert.alert("Erro", "Por favor, digite seu CPF.");
      return;
    }

    Alert.alert("Pagamento Realizado", `CPF informado: ${cpf}`);
    navigation.navigate("Status2");
  };

  const Pagamento = () => {
    navigation.navigate("Pagamento");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={Pagamento}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/li6hzwg0_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.iconHeader}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Dados</Text>
        </View>

        {/* Campo CPF */}
        <View style={styles.card}>
          <Text style={styles.label}>CPF:</Text>

         <View style={styles.inputRow}>
  <TextInput
    style={styles.input}
    placeholder="Digite seu CPF"
    value={cpf}
    onChangeText={setCpf}
    keyboardType="numeric"
    maxLength={11} // limite para CPF
  />

  {/* 🔹 Ícone virou botão para limpar o campo */}
  <TouchableOpacity onPress={() => setCpf("")}>
    <Image
      source={{
        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/y0ooi2t9_expires_30_days.png",
      }}
      resizeMode="stretch"
      style={styles.iconInput}
    />
  </TouchableOpacity>
</View>


          <Text style={styles.helperText}>
            Exemplo: 12345678901
          </Text>

          {/* Botão pagar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={Menu}>
              <Text style={styles.buttonText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dados;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginTop: 48,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 1, 
  },
  iconHeader: {
    width: 32,
    height: 32,
    marginLeft: 16,
  },
  title: {
    flex: 1,
    fontSize: 28,
    color: "#000",
    textAlign: "center",
    fontFamily: "BesleyRegular",
  },
  card: {
    backgroundColor: "#FFF8F5",
    borderColor: "#D7C2B8",
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0DFD7",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  iconInput: {
    width: 40,
    height: 40,
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    color: "#52443C",
    marginBottom: 20,
    marginLeft: 8,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#8D4F28",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});