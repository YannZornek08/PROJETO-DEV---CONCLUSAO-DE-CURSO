import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

// IMAGENS DO NAV
const home = require("../../assets/nav-icons/home.png");
const fav = require("../../assets/nav-icons/star.png");
const cupom = require("../../assets/nav-icons/cupom.png");
const qrcode = require("../../assets/nav-icons/qrcode.png");

export default function AutenticacaoComanda() {
  const [codigo, setCodigo] = useState<string>("");

  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  function confirmarComanda() {
    // sua lógica (ex: chamar API)
    console.log("Código digitado:", codigo);

    // exemplo de navegação depois de confirmar:
    // navigation.navigate("Home");
  }

  function Home() {
    navigation.navigate("Carrinho");
  }

  function Favoritos() {
    navigation.navigate("Favoritos");
  }

  function Cupons() {
    navigation.navigate("Cupons");
  }

  function LerQR() {
    navigation.navigate("LerQR");
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

      {/* Bottom Nav */}
      <View style={styles.fullNav}>
        <TouchableOpacity onPress={Home} style={[styles.currentNav, styles.nav]}>
          <Image source={home} style={styles.imagesNav} />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Favoritos} style={styles.nav}>
          <Image source={fav} style={styles.imagesNav} resizeMode="cover" />
          <Text>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Cupons} style={styles.nav}>
          <Image source={cupom} style={styles.imagesNav} resizeMode="cover" />
          <Text>Cupons</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={LerQR} style={styles.nav}>
          <Image source={qrcode} style={styles.imagesNav} />
          <Text>Ler QR</Text>
        </TouchableOpacity>
      </View>
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
  fullNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  nav: {
    alignItems: "center",
    justifyContent: "center",
  },
  currentNav: {
    borderTopWidth: 2,
    borderColor: "#8B4B26",
  },
  imagesNav: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
});
