import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import BottomNavBar from "../../components/navButton";
import { useOrder } from "../../contexts/OrderContext";
import { useCostumer } from "../../contexts/CostumerContext";
import BackButton from "../../components/cart";
import { Image } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

type RouteDetailParams = {
  Order: {
    table_id: string;
    costumer_id: string;
  };
};

type OrderRouterProps = RouteProp<RouteDetailParams, "Order">;

export default function LerQR() {
    const { user, signOut } = useContext(AuthContext);
  
  const route = useRoute<OrderRouterProps>();
  const [codigo, setCodigo] = useState<string>("");
  const { orderId, setOrderId } = useOrder();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const { costumerId, setCostumerId } = useCostumer();

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
    if (orderId) {
      Alert.alert("Erro",'Já existe uma comanda aberta. Feche ou exclua a comanda atual antes de abrir outra.');
      return;
    }
    try {
      const response = await api.post("/order", {
        table_id: id_mesa,
        costumer_id: costumerId,
      });
      console.log("Comanda criada:", response.data);
      setOrderId(response.data.id);
      Alert.alert("Sucesso","Comanda criada com sucesso!" + "\n" + "Sua mesa é a " + response.data.table.number);
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
          <BackButton to="LerQR" />
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
        {/* <View>
          <Text >
            Seja bem-vindo{user?.name ? `, ${user.name}` : ""}.
          </Text>
        </View> */}
        <View style={styles.content}>
          {/* Logout button - estilo abaixo em `styles.logoutButton` / `styles.logoutIcon` */}
          <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()} accessibilityLabel="Logout">
            <Image
              source={require("../../assets/door.png")}
              resizeMode="contain"
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
          <Text style={styles.titulo}>Ler QR Code da Comanda</Text>

          <TouchableOpacity
            style={[styles.botao, { marginTop: 20, backgroundColor: "#4B8B26" }]}
            onPress={() => {
              if (orderId) {
                Alert.alert("",'Você já possui uma comanda aberta. Feche ou exclua-a antes de abrir um novo QR.');
                return;
              }
              setShowCamera(true);
            }}
          >
            <Text style={styles.textoBotao}>Abrir Câmera</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
          style={[styles.botao, { marginTop: 20, backgroundColor: "#4B8B26" }]}
          onPress={() => {
            if (orderId) {
              alert('Já existe uma comanda aberta.');
              return;
            }
            confirmarComanda("33fc7f94-9bbd-47ca-800c-54e6676b98ba");
          }}
        >
          <Text style={styles.textoBotao}>Botão para abrir sem QRCODE (mocado)</Text>
        </TouchableOpacity> */}

          <Text style={styles.link}>Problemas? Fale com o atendente!</Text>
        </View>
        <BottomNavBar activeRoute="LerQR">

        </BottomNavBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 26,
    marginBottom: 16,
  },
    headerText: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 26,
    fontFamily: "BesleyBold",
    // fontSize: 24,
    // fontFamily: "BesleyBold",
    // textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoutRight: {
    width: 32,
    height: 32,
    marginTop: 8,
    marginRight: 10
  },
  /* -----------------------
     Logout button CSS
     - `logoutButton`: posiciona o botão no canto superior direito
     - `logoutIcon`: define tamanho e espaçamento da imagem
  ----------------------- */
  logoutButton: {
    position: 'absolute',
    top: 90,
    right: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    width: 28,
    height: 28,
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

