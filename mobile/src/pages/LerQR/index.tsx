import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
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

export default function LerQR() {
  const route = useRoute<OrderRouterProps>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  
  useEffect(() => {
    if (showCamera) {
      console.log("Abrindo câmera para leitura de QR Code...");
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }
  }, [showCamera]);

 
  async function confirmarComanda(id_mesa: string) {
    try {
      const response = await api.post("/order", {
        table_id: id_mesa,
        //   route.params?.table_id ??
        //   Error("ID da mesa falhou"),
        costumer_id:
          route.params?.costumer_id ??
          "9e7bab9c-c0d3-4da5-a396-262d2eec957f",
      });
      console.log("Comanda criada:", response.data);
    } catch (err: any) {
      console.error(
        "Erro ao criar comanda:",
        err.response?.data || err.message || err
      );
    }
  }

  
  const handleBarCodeScanned = (result: any) => {
    setShowCamera(false);
    console.log("QR Code detectado! Dados:", result.data);
    const id_da_mesa = result.data
    confirmarComanda(id_da_mesa);
  };

  // Tela da câmera
  if (showCamera) {
    if (hasPermission === null) {
      return (
        <View style={styles.center}>
          <Text>Solicitando permissão da câmera...</Text>
        </View>
      );
    }
    if (hasPermission === false) {
      return (
        <View style={styles.center}>
          <Text>Permissão da câmera negada.</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => setShowCamera(false)}
        >
          <Text style={styles.textoBotao}>Fechar Câmera</Text>
        </TouchableOpacity>
        <BottomNavBar activeRoute="LerQR" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Ler QR Code da Comanda</Text>

        <TouchableOpacity
          style={[styles.botao, { marginTop: 20, backgroundColor: "#4B8B26" }]}
          onPress={() => setShowCamera(true)}
        >
          <Text style={styles.textoBotao}>Abrir Câmera</Text>
        </TouchableOpacity>

        <Text style={styles.link}>Problemas? Fale com o atendente!</Text>
      </View>
      <BottomNavBar activeRoute="LerQR" />
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
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "BesleyBold",
  },
  botao: {
    backgroundColor: "#8B4B26",
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
});

