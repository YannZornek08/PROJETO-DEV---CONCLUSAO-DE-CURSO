import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

const Dados: React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const Menu = () => {
      Alert.alert(
        "Pagamento Realizado",
      );
      navigation.navigate("Menu")
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/li6hzwg0_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.iconHeader}
          />
          <Text style={styles.title}>Dados</Text>
        </View>

        {/* Campo CPF */}
        <View style={styles.card}>
          <Text style={styles.label}>CPF:</Text>

          <View style={styles.inputRow}>
            <View style={styles.box} />
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/y0ooi2t9_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.iconInput}
            />
          </View>

          <Text style={styles.helperText}>
            Exemplo: exemplo@gmail.com
          </Text>

          {/* Botão pagar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={Menu}
            >
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
    alignItems: "center",
  },
  iconHeader: {
    width: 48,
    height: 48,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
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
  box: {
    flex: 1,
    height: 48,
    marginRight: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
  },
  iconInput: {
    width: 40,
    height: 40,
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
