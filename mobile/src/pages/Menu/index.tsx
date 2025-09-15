import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

// IMAGENS DO NAV
<<<<<<< HEAD
const home = require('../../assets/nav-icons/home.png')
const fav = require('../../assets/nav-icons/star.png')
const cupom = require('../../assets/nav-icons/cupom.png')
const qrcode = require('../../assets/nav-icons/qrcode.png')

/////////////////
=======
const home = require('../../assets/nav-icons/home.png');
const fav = require('../../assets/nav-icons/star.png');
const cupom = require('../../assets/nav-icons/cupom.png');
const qrcode = require('../../assets/nav-icons/qrcode.png');
>>>>>>> 2bd5a7ca31e28f11c8a6de321021cedec53caf9d

type Produto = {
  id: string;
  name: string;
  price: number;
  banner: string;
}

export default function HomeScreen() {
  const [textInput1, onChangeTextInput1] = useState<string>("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const Carrinho = () => alert("Página Carrinho");
  const Settings = () => alert("Settings!");
  const Menu = () => navigation.navigate("Menu");
  const Cupons = () => navigation.navigate("Cupons");
  const Favoritos = () => navigation.navigate("Favoritos");
  const LerQR = () => navigation.navigate("LerQR");

  const pizzas = [
    {
      title: "Pizza de Pepperoni",
      price: "R$42,00",
      image: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/ggqdmnfn_expires_30_days.png",
    },
    {
      title: "Pizza de Abacaxi",
      price: "R$42,00",
      image: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/02jqnrgo_expires_30_days.png",
    },
    {
      title: "Pizza de Pepperoni",
      price: "R$42,00",
      image: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/sow9drm9_expires_30_days.png",
    },
    {
      title: "Pizza de Abacaxi",
      price: "R$42,00",
      image: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/50ff6gko_expires_30_days.png",
    },
    {
      title: "Pizza de Pepperoni",
      price: "R$42,00",
      image: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/6zusf2rc_expires_30_days.png",
    },
    {
      title: "Pizza de Abacaxi",
      price: "R$42,00",
      image: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/ec18wgmn_expires_30_days.png",
    },
  ];

  //Dividir pizzas em linhas de 2
  const pizzaRows = [];
  for (let i = 0; i < pizzas.length; i += 2) {
    pizzaRows.push(pizzas.slice(i, i + 2));
  }

<<<<<<< HEAD
  function LerQR() {
    navigation.navigate("LerQR");
  }

  useEffect(() => {
    async function verProdutos() {
      try {
        // 👉 Chama a rota que retorna TODOS os produtos
        const response = await api.get('/product/all');
        setProdutos(response.data);
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    verProdutos();
  }, []);

=======
>>>>>>> 2bd5a7ca31e28f11c8a6de321021cedec53caf9d
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bom dia, João.</Text>

          {/* Barra de busca */}
          <View style={styles.searchBar}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/m1yrb272_expires_30_days.png" }}
              resizeMode="stretch"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="O que busca?"
              value={textInput1}
              onChangeText={onChangeTextInput1}
              style={styles.searchInput}
            />
            <View style={styles.searchIconsRight}>
              <TouchableOpacity onPress={Carrinho}>
                <Image
                  source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/tmmocg1t_expires_30_days.png" }}
                  resizeMode="stretch"
                  style={styles.iconRight}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={Settings}>
                <Image
                  source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/bjnemhbr_expires_30_days.png" }}
                  resizeMode="stretch"
                  style={styles.iconRight}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão filtros */}
          <View style={styles.filtersWrapper}>
<<<<<<< HEAD
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => console.log("pressed!")}
            >
=======
            <TouchableOpacity style={styles.filterButton} onPress={() => alert("Pressed!")}>
>>>>>>> 2bd5a7ca31e28f11c8a6de321021cedec53caf9d
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/uip8oeqk_expires_30_days.png" }}
                resizeMode="stretch"
                style={styles.filterIcon}
              />
              <Text style={styles.filterText}>Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.tableText}>Sua mesa: 05</Text>

        {/* Cards dinâmicos */}
        <View style={styles.cardsWrapper}>
<<<<<<< HEAD
          {produtos.reduce((rows: Produto[][], produto, index) => {
            if (index % 2 === 0) rows.push([produto]);
            else rows[rows.length - 1].push(produto);
            return rows;
          }, []).map((row, idx) => (
            <View style={styles.row} key={idx}>
              {row.map(prod => (
                <PizzaCard
                  key={prod.id}
                  title={prod.name}
                  price={`R$ ${prod.price}`}
                  image={prod.banner}
                />
=======
          {pizzaRows.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map((pizza, index) => (
                <View style={styles.card} key={index}>
                  <Image source={{ uri: pizza.image }} resizeMode="stretch" style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{pizza.title}</Text>
                  <Text style={styles.cardPrice}>{pizza.price}</Text>
                  <TouchableOpacity style={styles.addButton} onPress={() => alert(`${pizza.title} adicionado!`)}>
                    <Text style={styles.addText}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
>>>>>>> 2bd5a7ca31e28f11c8a6de321021cedec53caf9d
              ))}
            </View>
          ))}
        </View>

<<<<<<< HEAD
        {/* Bottom Menu */}
=======
        {/* Bottom Nav */}
>>>>>>> 2bd5a7ca31e28f11c8a6de321021cedec53caf9d
        <View style={styles.fullNav}>
          <TouchableOpacity style={[styles.currentNav, styles.nav]}>
            <Image source={home} style={styles.imagesNav} />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Favoritos} style={styles.nav}>
<<<<<<< HEAD
            <Image source={fav} style={styles.imagesNav} resizeMode="cover" />
            <Text>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Cupons} style={styles.nav}>
            <Image source={cupom} style={styles.imagesNav} resizeMode="cover" />
=======
            <Image source={fav} style={styles.imagesNav} />
            <Text>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Cupons} style={styles.nav}>
            <Image source={cupom} style={styles.imagesNav} />
>>>>>>> 2bd5a7ca31e28f11c8a6de321021cedec53caf9d
            <Text>Cupons</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={LerQR} style={styles.nav}>
            <Image source={qrcode} style={styles.imagesNav} />
            <Text>Ler QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
<<<<<<< HEAD

type PizzaCardProps = {
  title: string;
  price: string;
  image: string;
};

function PizzaCard({ title, price, image }: PizzaCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} resizeMode="stretch" style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardPrice}>{price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => alert(`${title} adicionado!`)}
      >
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/mijsyyvb_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={styles.addIcon}
        />
        <Text style={styles.addText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 86,
    paddingBottom: 7,
    marginBottom: 2,
  },
  headerText: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 26,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6E5DD",
    borderRadius: 28,
    padding: 4,
    marginBottom: 10,
    marginHorizontal: 26,
  },
=======

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { backgroundColor: "#FFFFFF", paddingTop: 86, paddingBottom: 7 },
  headerText: { color: "#000000", fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 26 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#F6E5DD", borderRadius: 28, padding: 4, marginBottom: 10, marginHorizontal: 26 },
>>>>>>> 2bd5a7ca31e28f11c8a6de321021cedec53caf9d
  searchIcon: { width: 48, height: 48, marginRight: 4 },
  searchInput: { color: "#52443C", fontSize: 16, flex: 1, paddingVertical: 12 },
  searchIconsRight: { flexDirection: "row" },
  iconRight: { width: 48, height: 48 },
  filtersWrapper: { alignItems: "center", paddingVertical: 8 },
  filterButton: { flexDirection: "row", backgroundColor: "#8D4F28", borderRadius: 12, paddingVertical: 6, paddingHorizontal: 12 },
  filterIcon: { width: 20, height: 20, marginRight: 4 },
  filterText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  tableText: { color: "#000000", fontSize: 16, fontWeight: "bold", marginBottom: 8, marginHorizontal: 26 },
  cardsWrapper: { marginBottom: 44, marginHorizontal: 26 },
  row: { flexDirection: "row", marginBottom: 30 },
  card: { flex: 1, alignItems: "center" },
  cardImage: { height: 180, marginBottom: 8, width: "100%" },
  cardTitle: { color: "#000000", fontSize: 16, textAlign: "center", marginBottom: 12 },
  cardPrice: { color: "#000000", fontSize: 14, marginBottom: 7 },
  addButton: { flexDirection: "row", backgroundColor: "#8D4F28", borderRadius: 100, paddingVertical: 6, paddingHorizontal: 12, marginVertical: 8, marginHorizontal: 35 },
  addText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold", flex: 1 },
  fullNav: { flexDirection: "row", backgroundColor: "#FCEAE2", borderRadius: 80, paddingHorizontal: 17, marginBottom: 42, marginHorizontal: 26, justifyContent: 'space-between' },
  currentNav: { backgroundColor: '#f3cdbdff', borderRadius: 100 },
  nav: { padding: 10 },
  imagesNav: { margin: 'auto', width: 30, height: 30, borderRadius: 8 }
});
