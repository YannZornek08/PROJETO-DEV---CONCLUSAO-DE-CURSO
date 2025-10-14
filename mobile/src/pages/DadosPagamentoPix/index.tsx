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

  const Pagamento = () => {
    navigation.navigate("Pagamento");
  };

  const StatusPedido = () => {
    navigation.navigate("StatusPedido");
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

       
        <View style={styles.card}>
          <Text style={styles.label}>Pagar com QR-Code:</Text>

          <Image
            source={require("../../assets/qrcode-template.png")}
            resizeMode="stretch"
            style={styles.qrcode}
          ></Image>


          {/* Botão pagar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={StatusPedido}>
              <Text style={styles.buttonText}>Copiar código</Text>
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
    marginTop: 0,
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
    marginLeft: -48,
    marginTop: 64,
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
  qrcode: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
    alignSelf: "center",
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
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});