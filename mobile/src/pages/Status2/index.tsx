import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const PedidoStatus: React.FC = () => {
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

                 <Text style={styles.statusNumber}>Status do Pedido</Text>

          {/* Card de status */}
          <View style={styles.card}>
            {/* Etapa 1 */}
            <View style={styles.step}>
              <View style={styles.circleActive} />
              <Text style={styles.stepTextActive}>Pedido feito</Text>
            </View>

            {/* Linha entre etapas */}
            <View style={styles.line} />

            {/* Etapa 2 */}
            <View style={styles.step}>
              <View style={styles.circle} />
              <Text style={styles.stepText}>Preparando pedido</Text>
            </View>
          </View>
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
  statusNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFF8F5",
    borderColor: "#D7C2B8",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginHorizontal: 24,
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
  line: {
    height: 40,
    width: 2,
    backgroundColor: "#D7C2B8",
    marginLeft: 8,
    marginVertical: 8,
  },
  stepText: {
    fontSize: 20,
    color: "#555",
  },
  stepTextActive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
